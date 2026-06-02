"use client";

import { useState, useEffect, useRef } from "react";
import { calculateChance } from "@/lib/calculator";
import { SPECS, UNIS, COMBINATIONS } from "@/lib/data";
import type { Language, Quota } from "@/types";
import { supabase } from "@/lib/supabase";

// Все наши модульные компоненты
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import AdminPanel, { CustomClientData } from "@/components/AdminPanel";
import VipResult from "@/components/VipResult";
import PaywallModal from "@/components/PaywallModal";
import SpecsTab from "@/components/SpecsTab";
import UnisTab from "@/components/UnisTab";
import HomeTab from "@/components/HomeTab";
import CalcTab from "@/components/CalcTab";
import DetailModals from "@/components/DetailModals";

const WHATSAPP_NUMBER = "87052230254";
const VALID_PROMOS = ["SENIM2026", "GRANT1990", "TURAKBAYEV"];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, type: "success" | "error" = "error") => {
    setToast({ message, type });
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 3500);
  };

  // Состояния калькулятора
  const [score, setScore] = useState<string>("");
  const [lang, setLang] = useState<Language>("kk");
  const [quota, setQuota] = useState<Quota>("general");
  const [selectedComboId, setSelectedComboId] = useState<string>("");
  const [selectedTargetSpecs, setSelectedTargetSpecs] = useState<string[]>([]);
  const [isSpecDropdownOpen, setIsSpecDropdownOpen] = useState(false);
  const [specDropdownSearch, setSpecDropdownSearch] = useState("");
  const [resultData, setResultData] = useState<ReturnType<typeof calculateChance> | null>(null);

  // Состояния оплаты и VIP
  const [hasPaid, setHasPaid] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [vipData, setVipData] = useState<CustomClientData | null>(null);

  // Состояния модалок
  const [selectedSpec, setSelectedSpec] = useState<typeof SPECS[0] | null>(null);
  const [selectedUni, setSelectedUni] = useState<typeof UNIS[0] | null>(null);

  // Глобальная смена темы
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // Авто-выбор профессий при смене комбинации
  useEffect(() => {
    if (selectedComboId) {
      const combo = COMBINATIONS.find(c => c.id === selectedComboId);
      if (combo) {
        const specsForCombo = SPECS.filter(spec => spec.subjects.includes(combo.subjects[0]) && spec.subjects.includes(combo.subjects[1]));
        setSelectedTargetSpecs(specsForCombo.map(s => s.code));
      }
      setSpecDropdownSearch(""); 
      setIsSpecDropdownOpen(false);
    } else {
      setSelectedTargetSpecs([]);
    }
  }, [selectedComboId]);

  const handleCalculate = () => {
    const numScore = parseInt(score);
    if (!numScore || numScore < 0 || numScore > 140) return showToast("0–140 аралығында бал енгізіңіз");
    const combo = COMBINATIONS.find(c => c.id === selectedComboId);
    if (!combo) return showToast("Пәндер комбинациясын таңдаңыз");
    if (selectedTargetSpecs.length === 0) return showToast("Кем дегенде бір мамандықты таңдаңыз");
    
    if (!hasPaid) {
      setIsPaymentModalOpen(true);
      return;
    }

    setResultData(calculateChance(numScore, combo.subjects, quota, selectedTargetSpecs));
    setIsSpecDropdownOpen(false);
  };

  const handlePromoSubmit = async () => {
    const input = promoInput.trim().toUpperCase();
    if (!input) return;

    try {
      // Отправляем код на наш новый скрытый сервер
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input })
      });
      const result = await res.json();

      // Обрабатываем ответ от сервера
      if (result.status === 'admin') {
        setIsAdminAuth(true); setActiveTab("admin"); setIsPaymentModalOpen(false);
        showToast("Сарапшы панеліне қош келдіңіз!", "success"); 
        return;
      }

      if (result.status === 'master') {
        setHasPaid(true); setVipData(null); setIsPaymentModalOpen(false);
        showToast("Промокод сәтті қабылданды!", "success");
        const numScore = parseInt(score); const combo = COMBINATIONS.find(c => c.id === selectedComboId);
        if (combo && numScore) setResultData(calculateChance(numScore, combo.subjects, quota, selectedTargetSpecs));
        return;
      }

      if (result.status === 'used') {
        const localData = localStorage.getItem("senim_vip_" + input);
        if (localData) {
           setHasPaid(true); setVipData(JSON.parse(localData)); setIsPaymentModalOpen(false);
           showToast(`Қайта қош келдіңіз, ${result.data.client_name}!`, "success"); 
        } else {
           showToast("⚠️ Бұл промокод басқа құрылғыда қолданылып қойған (Уже активирован)", "error"); 
        }
        return;
      }

      if (result.status === 'success') {
        const clientData = {
          code: result.data.code, clientName: result.data.client_name, score: result.data.score,
          comboId: result.data.combo_id, targets: result.data.targets, createdAt: result.data.created_at
        };
        localStorage.setItem("senim_vip_" + input, JSON.stringify(clientData));
        setHasPaid(true); setVipData(clientData); setIsPaymentModalOpen(false);
        showToast(`Сәлем, ${result.data.client_name}! Жеке талдауыңыз дайын.`, "success"); 
        return;
      }

      // Если статус 'error'
      showToast("Қате промокод. Қайта тексеріңіз немесе WhatsApp арқылы сатып алыңыз.");

    } catch (error) {
      showToast("Байланыс қатесі. Интернетті тексеріңіз.");
    }
  };

  const buyPromoWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Сәлеметсіз бе! Мен SENIM платформасынан жеке грант талдауын алуға промокод сатып алғым келеді (1990 тг).`)}`, "_blank");

  const handleNavigation = (tabId: string) => {
    if (tabId === "ai") setIsPaymentModalOpen(true);
    else setActiveTab(tabId);
  };

  const isLight = theme === "light";

  return (
    <div className={`min-h-screen font-sans flex flex-col relative overflow-hidden pb-20 md:pb-0 transition-colors duration-300 ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-slate-950 text-slate-200'}`}>
      
      {/* Toast Уведомления */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-6 fade-in duration-300 backdrop-blur-xl border ${toast.type === 'error' ? (isLight ? 'bg-red-50/90 text-red-700 border-red-200' : 'bg-red-500/10 text-red-400 border-red-500/30') : (isLight ? 'bg-emerald-50/90 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30')}`}>
          <span className="text-xl">{toast.type === 'error' ? '⚠️' : '✅'}</span><span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* Фоновое свечение */}
      <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 print:hidden ${isLight ? 'bg-amber-500/5' : 'bg-amber-500/5'}`} />

      {activeTab !== "admin" && <div className="print:hidden"><Header activeTab={activeTab} setActiveTab={handleNavigation} theme={theme} setTheme={setTheme} /></div>}

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative z-10">
        {activeTab === "home" && <HomeTab isLight={isLight} setActiveTab={handleNavigation} />}
        {activeTab === "admin" && isAdminAuth && <AdminPanel isLight={isLight} lang={lang} onClose={() => { setActiveTab("calc"); setVipData(null); }} showToast={showToast} />}
        {activeTab === "specs" && <SpecsTab isLight={isLight} lang={lang} setSelectedSpec={setSelectedSpec} />}
        {activeTab === "unis" && <UnisTab isLight={isLight} setSelectedUni={setSelectedUni} />}
        {activeTab === "calc" && vipData && <VipResult vipData={vipData} isLight={isLight} lang={lang} onReset={() => setVipData(null)} />}
        
        {activeTab === "calc" && !vipData && (
          <CalcTab
            isLight={isLight} score={score} setScore={setScore} lang={lang} setLang={setLang} quota={quota} setQuota={setQuota}
            selectedComboId={selectedComboId} setSelectedComboId={setSelectedComboId} selectedTargetSpecs={selectedTargetSpecs}
            setSelectedTargetSpecs={setSelectedTargetSpecs} isSpecDropdownOpen={isSpecDropdownOpen} setIsSpecDropdownOpen={setIsSpecDropdownOpen}
            specDropdownSearch={specDropdownSearch} setSpecDropdownSearch={setSpecDropdownSearch} resultData={resultData}
            hasPaid={hasPaid} handleCalculate={handleCalculate} setSelectedSpec={setSelectedSpec}
          />
        )}
      </main>

      <DetailModals isLight={isLight} lang={lang} selectedSpec={selectedSpec} setSelectedSpec={setSelectedSpec} selectedUni={selectedUni} setSelectedUni={setSelectedUni} />

      <PaywallModal isOpen={isPaymentModalOpen} hasPaid={hasPaid} isLight={isLight} promoInput={promoInput} setPromoInput={setPromoInput} onClose={() => setIsPaymentModalOpen(false)} onSubmit={handlePromoSubmit} buyPromoWhatsApp={buyPromoWhatsApp} />

      {activeTab !== "admin" && <div className="print:hidden"><MobileNav activeTab={activeTab} setActiveTab={handleNavigation} isLight={isLight} /></div>}
    </div>
  );
}