"use client";

import { useRef, useState } from "react";
import { SPECS, UNIS, COMBINATIONS } from "@/lib/data";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export default function VipResult({ vipData, isLight, lang, onReset }: any) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const combo = COMBINATIONS.find(c => c.id === vipData.comboId);
  const comboName = combo ? (lang === 'ru' ? combo.ru : combo.kk) : 'Белгісіз';

  const downloadPDF = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);

    try {
      // Современный метод создания скриншота (не боится lab и oklch цветов)
      const dataUrl = await toPng(printRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Высокое качество (Retina)
        backgroundColor: isLight ? "#ffffff" : "#0f172a",
        style: {
          margin: '0',
        }
      });
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Высчитываем правильные пропорции высоты
      const domWidth = printRef.current.offsetWidth;
      const domHeight = printRef.current.offsetHeight;
      const pdfHeight = (domHeight * pdfWidth) / domWidth;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SENIM_Грант_Талдау_${vipData.clientName}.pdf`);
    } catch (error: any) {
      console.error("PDF Қатесі:", error);
      alert(`PDF жасау кезінде қате шықты. Разработчик консолін тексеріңіз (F12).`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto relative">
      
      {/* ФОНОВОЕ СВЕЧЕНИЕ (Остается снаружи PDF) */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-amber-400/10 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none z-0" />

      {/* ЗОНА ГЕНЕРАЦИИ PDF */}
      <div 
        ref={printRef} 
        className={`rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border relative overflow-hidden z-10 ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}
      >
        <div className="flex justify-between items-start border-b pb-6 mb-8 relative z-10 border-slate-100 dark:border-white/5">
          <div className="flex items-center">
  <img 
    src="/logo.png" 
    alt="SENIM Logo" 
    // Увеличили высоту: h-16 (64px) для мобилок и h-20 (80px) для ПК
    className={`h-16 md:h-20 w-auto object-contain transition-all py-1 ${theme === 'dark' ? 'bg-white/95 px-4 rounded-2xl drop-shadow-md' : ''}`}
  />
</div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest inline-block mb-2">Кепілдік берілген</div>
            <div className="text-xs font-bold text-slate-400">{new Date(vipData.createdAt).toLocaleDateString('ru-RU')}</div>
          </div>
        </div>

        <div className={`rounded-[24px] p-6 mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 border relative z-10 ${isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/50 border-white/5'}`}>
          <div className="text-center md:text-left">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Абитуриент</div>
            <div className={`text-2xl md:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{vipData.clientName}</div>
          </div>
          
          <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-800" />
          
          <div className="text-center md:text-left">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ҰБТ Балы</div>
            <div className="text-3xl md:text-4xl font-black text-amber-500">{vipData.score}</div>
          </div>

          <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-800" />

          <div className="text-center md:text-left">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Бейіндік пәндер</div>
            <div className={`text-sm md:text-base font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{comboName}</div>
          </div>
        </div>

        <div className="mb-6 relative z-10">
          <h2 className={`text-xl font-black flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            🎯 Оңтайлы гранттық бағыттар
          </h2>
        </div>

        <div className="space-y-5 relative z-10">
          {vipData.targets?.map((target: any, index: number) => {
            const specInfo = SPECS.find(s => s.code === target.specCode);
            const uniInfo = UNIS.find(u => u.code === target.uniCode);
            
            const displayComp = target.competition === "GENERAL_COMPETITION" ? "Жалпы конкурс" : target.competition;
            const chanceColor = target.chance >= 85 ? 'text-emerald-500' : target.chance >= 50 ? 'text-amber-500' : 'text-red-500';
            const chanceBg = target.chance >= 85 ? 'bg-emerald-500/10 border-emerald-500/20' : target.chance >= 50 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20';

            return (
              <div key={target.id} className={`rounded-[20px] border p-5 flex flex-col md:flex-row gap-5 items-start md:items-center ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-white/10'}`}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-black text-lg shrink-0">
                  {index + 1}
                </div>
                
                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-white bg-blue-600 px-2 py-1 rounded-md">БББТ: {target.specCode}</span>
                      <span className={`text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{specInfo?.name[lang]}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-t pt-3 border-slate-100 dark:border-white/5">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Университет</div>
                      <div className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>🏛 {target.uniCode} — {uniInfo?.name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Квота / Конкурс</div>
                      <div className={`text-sm font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>🔖 {displayComp}</div>
                    </div>
                  </div>
                </div>

                <div className={`shrink-0 flex flex-col items-center justify-center w-full md:w-24 h-24 rounded-[16px] border ${chanceBg}`}>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Шанс</div>
                  <div className={`text-3xl font-black ${chanceColor}`}>{target.chance}%</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center relative z-10">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Сеніммен жасалған • SENIM.KZ
          </div>
          <div className="text-[10px] font-bold text-slate-400">
            ID: {vipData.code}
          </div>
        </div>
      </div>
      
      {/* КНОПКИ УПРАВЛЕНИЯ */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button 
          onClick={downloadPDF} 
          disabled={isGenerating}
          className={`flex-1 py-4 px-6 text-sm font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 outline-none active:scale-95 ${isLight ? 'bg-slate-900 hover:bg-black text-white shadow-slate-900/20' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'} ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              PDF Құжат жасалуда...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Ресми PDF жүктеп алу
            </>
          )}
        </button>

        <button 
          onClick={onReset} 
          disabled={isGenerating}
          className={`sm:w-auto px-8 py-4 text-sm font-bold rounded-2xl transition-all outline-none active:scale-95 ${isLight ? 'bg-slate-200 text-slate-800 hover:bg-slate-300' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
        >
          Қайта есептеу
        </button>
      </div>
    </div>
  );
}