"use client";

import { useState, useEffect, useMemo } from "react";
import { SPECS, UNIS, COMBINATIONS } from "@/lib/data";

export interface TargetItem {
  id: string;
  specCode: string;
  uniCode: string;
  competition: string;
  chance: number;
}

export interface CustomClientData {
  code: string;
  clientName: string;
  score: number;
  comboId: string;
  targets: TargetItem[];
  createdAt: string;
  isUsed?: boolean;
}

export default function AdminPanel({ isLight, lang, onClose, showToast }: any) {
  const [customPromos, setCustomPromos] = useState<CustomClientData[]>([]);
  const [adminClientName, setAdminClientName] = useState("");
  const [adminScore, setAdminScore] = useState("");
  const [adminComboId, setAdminComboId] = useState("");
  const [adminTargets, setAdminTargets] = useState<TargetItem[]>([]);
  
  // States for target adding
  const [targetSpec, setTargetSpec] = useState("");
  const [targetUni, setTargetUni] = useState("");
  const [targetComp, setTargetComp] = useState("Жалпы конкурс");
  const [targetChance, setTargetChance] = useState("100");
  const [adminUniSearch, setAdminUniSearch] = useState("");

  const [clientSearchQuery, setClientSearchQuery] = useState("");

  const fetchPromos = async () => {
    const res = await fetch('/api/admin');
    if (res.ok) {
      const data = await res.json();
      setCustomPromos(data.map((p: any) => ({ 
        code: p.code, clientName: p.client_name, score: p.score, comboId: p.combo_id, targets: p.targets, createdAt: p.created_at, isUsed: p.is_used 
      })));
    }
  };

  useEffect(() => { fetchPromos(); }, []);

  const adminComboSpecs = useMemo(() => {
    const combo = COMBINATIONS.find(c => c.id === adminComboId);
    return combo ? SPECS.filter(spec => spec.subjects.includes(combo.subjects[0]) && spec.subjects.includes(combo.subjects[1])) : [];
  }, [adminComboId]);

  const addAdminTarget = () => {
    if (!targetSpec || !targetUni || !targetChance) return showToast("Барлық өрістерді толтырыңыз", "error");
    setAdminTargets([...adminTargets, { id: Math.random().toString(), specCode: targetSpec, uniCode: targetUni, competition: targetComp, chance: parseInt(targetChance) }]);
    setTargetSpec(""); 
    setTargetUni(""); 
  };

  const saveCustomPromo = async () => {
    if (!adminClientName || !adminScore || !adminComboId || adminTargets.length === 0) {
      return showToast("Клиент атын, балын және кем дегенде 1 нысана қосыңыз!", "error");
    }
    const newCode = "VIP-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const payload = { code: newCode, client_name: adminClientName, score: parseInt(adminScore), combo_id: adminComboId, targets: adminTargets };
    
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) return showToast(`Қате шықты!`, "error");

    showToast(`Промокод жасалды: ${newCode}`, "success");
    setAdminClientName(""); setAdminScore(""); setAdminComboId(""); setAdminTargets([]);
    fetchPromos();
  };

  const deleteCustomPromo = async (code: string) => {
    if(confirm(`Нақты өшіресіз бе? Код: ${code}`)) {
        const res = await fetch(`/api/admin?code=${code}`, { method: 'DELETE' });
        if (res.ok) {
          showToast("Промокод өшірілді", "success");
          fetchPromos();
        }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Код көшірілді!", "success");
  };

  const totalRevenue = customPromos.length * 1990;
  const usedCodes = customPromos.filter(p => p.isUsed).length;
  const activeCodes = customPromos.length - usedCodes;

  const filteredPromos = customPromos.filter(p => 
    p.clientName.toLowerCase().includes(clientSearchQuery.toLowerCase()) || 
    p.code.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6 print:hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-2 mb-2">
        <div>
          <h1 className={`text-3xl font-black flex items-center gap-3 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <span>👑</span> VIP Басқару
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-1">Клиенттерге арналған жеке грант талдауын жасау</p>
        </div>
        <button onClick={onClose} className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all shadow-sm active:scale-95 border ${isLight ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50' : 'bg-slate-800 border-white/10 text-white hover:bg-slate-700'}`}>
          Сайтқа қайту ➔
        </button>
      </div>

      {/* Stats Cards (Matched to Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>Жалпы табыс
          </div>
          <div className="text-3xl font-black text-emerald-500">{totalRevenue.toLocaleString('kk-KZ')} ₸</div>
        </div>
        <div className={`p-6 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>Сатылған кодтар
          </div>
          <div className="text-3xl font-black text-blue-600">{customPromos.length} дана</div>
        </div>
        <div className={`p-6 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>Қолданылуы (Активация)
          </div>
          <div className="text-xl font-bold text-amber-500">{usedCodes} іске қосылды</div>
          <div className="text-sm font-medium text-slate-400">{activeCodes} күтуде</div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Form */}
        <div className="md:col-span-6 lg:col-span-5 space-y-6">
          <div className={`rounded-[32px] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
            <h2 className={`text-xl font-black mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>Жаңа Клиент</h2>
            
            <div className="space-y-5 mb-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Клиенттің аты</label>
                <input value={adminClientName} onChange={e => setAdminClientName(e.target.value)} className={`w-full rounded-2xl py-3.5 px-4 outline-none text-sm font-bold transition-all ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-slate-100 placeholder:text-slate-400' : 'bg-slate-800/50 text-white focus:bg-slate-800 placeholder:text-slate-500'}`} placeholder="Мысалы: Алихан" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">ҰБТ Балы</label>
                  <input type="number" value={adminScore} onChange={e => setAdminScore(e.target.value)} className={`w-full rounded-2xl py-3.5 px-4 outline-none text-sm font-bold transition-all ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-slate-100 placeholder:text-slate-400' : 'bg-slate-800/50 text-white focus:bg-slate-800 placeholder:text-slate-500'}`} placeholder="0 - 140" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Бейіндік пәндер</label>
                  <select value={adminComboId} onChange={e => { setAdminComboId(e.target.value); setAdminTargets([]); }} className={`w-full rounded-2xl py-3.5 px-4 outline-none text-sm font-bold cursor-pointer transition-all ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-slate-100' : 'bg-slate-800/50 text-white focus:bg-slate-800'}`}>
                    <option value="">Таңдаңыз...</option>
                    {COMBINATIONS.map(c => <option key={c.id} value={c.id}>{c.kk}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Target Adder */}
            {adminComboId && (
              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-300">
                <select value={targetSpec} onChange={e => setTargetSpec(e.target.value)} className={`w-full rounded-xl py-3 px-4 text-xs font-bold outline-none transition-all ${isLight ? 'bg-amber-50/50 text-slate-800 focus:bg-amber-50' : 'bg-amber-500/5 text-white focus:bg-amber-500/10'}`}>
                  <option value="">1. Мамандықты таңдаңыз...</option>
                  {adminComboSpecs.map(s => <option key={s.code} value={s.code}>{s.code} - {s.name.kk}</option>)}
                </select>
                
                <div className={`rounded-xl flex flex-col overflow-hidden transition-all ${isLight ? 'bg-amber-50/50 focus-within:bg-amber-50' : 'bg-amber-500/5 focus-within:bg-amber-500/10'}`}>
                  <input type="text" placeholder="Университет іздеу..." value={adminUniSearch} onChange={e => setAdminUniSearch(e.target.value)} className="w-full bg-transparent py-3 px-4 text-xs font-bold outline-none border-b border-white/40 dark:border-white/5 placeholder:text-slate-400" />
                  <select value={targetUni} onChange={e => setTargetUni(e.target.value)} className="w-full bg-transparent py-3 px-4 text-xs font-bold outline-none cursor-pointer">
                    <option value="">2. Университетті таңдаңыз...</option>
                    {UNIS.filter(u => `${u.name} ${u.code}`.toLowerCase().includes(adminUniSearch.toLowerCase())).map(u => <option key={u.code} value={u.code}>{u.code} - {u.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select value={targetComp} onChange={e => setTargetComp(e.target.value)} className={`w-full rounded-xl py-3 px-4 text-xs font-bold outline-none transition-all ${isLight ? 'bg-amber-50/50 text-slate-800' : 'bg-amber-500/5 text-white'}`}>
                    <option value="Жалпы конкурс">Жалпы конкурс</option>
                    <option value="Ауыл квотасы">Ауыл квотасы</option>
                  </select>
                  <div className="relative">
                    <input type="number" value={targetChance} onChange={e => setTargetChance(e.target.value)} className={`w-full rounded-xl py-3 px-4 text-xs font-bold outline-none transition-all pr-8 ${isLight ? 'bg-amber-50/50 text-slate-800' : 'bg-amber-500/5 text-white'}`} placeholder="Шанс" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <button onClick={addAdminTarget} className={`w-full py-3.5 mt-2 rounded-xl text-sm font-black transition-all active:scale-95 outline-none ${isLight ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md' : 'bg-white text-slate-900 hover:bg-slate-100 shadow-md'}`}>
                  + Нысана қосу
                </button>
              </div>
            )}
            
            <button onClick={saveCustomPromo} className={`w-full py-4 mt-6 text-sm font-black rounded-2xl transition-all shadow-md active:scale-95 outline-none ${adminTargets.length > 0 ? 'bg-[#1e293b] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-slate-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800/50 dark:text-slate-500 shadow-none'}`}>
              Сақтау және Промокод жасау ✨
            </button>
          </div>
        </div>

        {/* Right Col: Database & Live Preview */}
        <div className="md:col-span-6 lg:col-span-7 space-y-6">
          
          {/* LIVE PREVIEW (WYSIWYG) */}
          {adminTargets.length > 0 && (
            <div className={`rounded-[32px] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-4 duration-500 ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
              <div className="mb-6">
                <h2 className="text-xl font-black mb-1">Грантқа нысаным</h2>
                <p className="text-xs font-medium text-slate-400">Балл: {adminScore} • {COMBINATIONS.find(c => c.id === adminComboId)?.kk}</p>
              </div>

              <div className="space-y-3">
                {adminTargets.map((target, index) => {
                  const specInfo = SPECS.find(s => s.code === target.specCode);
                  const uniInfo = UNIS.find(u => u.code === target.uniCode);
                  return (
                    <div key={target.id} className="relative group animate-in fade-in zoom-in-95 duration-200">
                      <div className={`rounded-xl shadow-sm border-l-4 border-l-[#10b981] p-4 flex gap-4 items-start ${isLight ? 'bg-[#f8fafc] border border-[#e2e8f0]' : 'bg-slate-950 border border-white/5'}`}>
                        <div className="text-[17px] font-black text-[#2563eb] min-w-[20px] pt-0.5">{index + 1}</div>
                        <div className="flex flex-col gap-1 text-[13px] w-full">
                          <div><span className="text-[#2563eb] font-bold mr-1">БББТ:</span> {target.specCode} — {specInfo?.name[lang as "kk" | "ru"]}</div>
                          <div><span className="text-[#2563eb] font-bold mr-1">ЖОО:</span> {target.uniCode} — {uniInfo?.name}</div>
                          <div><span className="text-[#2563eb] font-bold mr-1">Конкурс:</span> {target.competition}</div>
                          <div><span className="text-[#2563eb] font-bold mr-1">Шанс:</span> {target.chance}%</div>
                        </div>
                      </div>
                      <button onClick={() => setAdminTargets(adminTargets.filter(x=>x.id!==target.id))} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md flex items-center justify-center">✕</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Database Table */}
          <div className={`rounded-[32px] p-6 md:p-8 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] ${adminTargets.length > 0 ? 'h-[400px]' : 'h-[750px]'} ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/5'}`}>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
              <h2 className="text-xl font-black">Бұлттағы VIP База</h2>
              <input 
                type="text" 
                placeholder="Аты немесе промокод бойынша іздеу..." 
                value={clientSearchQuery} 
                onChange={e => setClientSearchQuery(e.target.value)} 
                className={`w-full xl:w-64 rounded-full py-2.5 px-5 text-xs font-bold outline-none transition-all ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-slate-100 placeholder:text-slate-400' : 'bg-slate-800/50 text-white focus:bg-slate-800 placeholder:text-slate-500'}`} 
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {filteredPromos.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600">
                   <div className="text-4xl mb-4 opacity-50">📬</div>
                   <p className="text-xs font-bold uppercase tracking-widest">Тізім бос немесе клиент табылмады</p>
                 </div>
              ) : (
                filteredPromos.map(promo => (
                  <div key={promo.code} className={`p-4 rounded-2xl relative transition-all flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${isLight ? 'bg-slate-50' : 'bg-slate-800/30'}`}>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        {promo.isUsed 
                          ? <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Активация жасалды</div>
                          : <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-[10px] font-bold"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Күтуде</div>
                        }
                        <span className="text-[10px] text-slate-400 font-bold">{new Date(promo.createdAt).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white leading-tight">{promo.clientName}</div>
                      <div className="text-xs font-bold text-slate-400 mt-0.5">{promo.score} балл • {promo.targets?.length || 0} нысана</div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                      <div className={`flex items-center p-1 rounded-xl w-full sm:w-auto justify-between ${isLight ? 'bg-white' : 'bg-slate-800'}`}>
                        <span className="font-mono font-black text-amber-500 px-3 text-xs tracking-wider">{promo.code}</span>
                        <button onClick={() => copyToClipboard(promo.code)} className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-colors ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}>
                          Көшіру
                        </button>
                      </div>
                      <button onClick={() => deleteCustomPromo(promo.code)} className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider transition-colors pr-1">
                        Өшіру
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}