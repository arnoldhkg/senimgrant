"use client";

import { SPECS, COMBINATIONS } from "@/lib/data";
import type { Language, Quota } from "@/types";

interface CalcTabProps {
  isLight: boolean;
  score: string;
  setScore: (s: string) => void;
  lang: Language;
  setLang: (l: Language) => void;
  quota: Quota;
  setQuota: (q: Quota) => void;
  selectedComboId: string;
  setSelectedComboId: (id: string) => void;
  selectedTargetSpecs: string[];
  setSelectedTargetSpecs: (specs: string[]) => void;
  isSpecDropdownOpen: boolean;
  setIsSpecDropdownOpen: (val: boolean) => void;
  specDropdownSearch: string;
  setSpecDropdownSearch: (val: string) => void;
  resultData: any;
  hasPaid: boolean;
  handleCalculate: () => void;
  setSelectedSpec: (spec: any) => void;
}

export default function CalcTab({
  isLight, score, setScore, lang, setLang, quota, setQuota, selectedComboId, setSelectedComboId,
  selectedTargetSpecs, setSelectedTargetSpecs, isSpecDropdownOpen, setIsSpecDropdownOpen,
  specDropdownSearch, setSpecDropdownSearch, resultData, hasPaid, handleCalculate, setSelectedSpec
}: CalcTabProps) {

  const selectedComboSpecs = COMBINATIONS.find(c => c.id === selectedComboId) 
    ? SPECS.filter(spec => spec.subjects.includes(COMBINATIONS.find(c => c.id === selectedComboId)!.subjects[0]) && spec.subjects.includes(COMBINATIONS.find(c => c.id === selectedComboId)!.subjects[1])) 
    : [];

  // Безопасный язык для базы данных
  const safeLang = lang === 'ru' ? 'ru' : 'kk';

  return (
    <div className="animate-in fade-in zoom-in-[0.99] duration-500 print:hidden relative max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>Грант <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">мүмкіндігі</span></h1>
        <p className={`text-sm font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Мәліметтерді енгізіп, нақты мүмкіндігіңізді тексеріңіз</p>
      </div>
      
      <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-stretch">
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className={`border rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Жалпы балл
            </h3>
            <input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="0 - 140" className={`w-full rounded-[20px] py-6 text-center text-5xl md:text-6xl font-black outline-none transition-all focus:ring-4 ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-white focus:ring-amber-500/20 placeholder:text-slate-300' : 'bg-slate-950/50 text-white focus:bg-slate-950 focus:ring-amber-500/20 placeholder:text-slate-700'}`} />
          </div>
          
          <div className={`border rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Оқу тілі & Квота
            </h3>
            <div className="flex gap-2 mb-4">
              {(["kk", "ru", "en"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`flex-1 py-3 text-xs font-bold rounded-[14px] outline-none transition-all ${lang === l ? (isLight ? "bg-slate-900 text-white shadow-md" : "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/50") : (isLight ? "bg-slate-50 text-slate-500 hover:bg-slate-100" : "bg-slate-950/50 text-slate-400 hover:bg-slate-800")}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: "general", label: "Жалпы" }, { id: "rural", label: "Ауыл" }].map((q) => (
                <button key={q.id} onClick={() => setQuota(q.id as Quota)} className={`py-3 text-xs font-bold rounded-[14px] outline-none transition-all ${quota === q.id ? (isLight ? "bg-slate-900 text-white shadow-md" : "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/50") : (isLight ? "bg-slate-50 text-slate-500 hover:bg-slate-100" : "bg-slate-950/50 text-slate-400 hover:bg-slate-800")}`}>{q.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-5">
          <div className={`border rounded-[32px] p-6 md:p-8 flex flex-col h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Пәндер комбинациясы
              </h3>
              {selectedComboId && <span className="text-[10px] px-2 py-1 rounded-md bg-amber-500/10 text-amber-500 font-bold uppercase">{COMBINATIONS.find(c => c.id === selectedComboId)?.kk}</span>}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 mb-6 space-y-2.5 max-h-[220px] md:max-h-[260px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {COMBINATIONS.map((combo) => (
                <button key={combo.id} onClick={() => setSelectedComboId(combo.id)} className={`w-full py-4 px-5 text-sm font-bold rounded-[16px] outline-none text-left flex justify-between items-center transition-all ${selectedComboId === combo.id ? (isLight ? "bg-amber-50 border-amber-200 text-amber-900 ring-1 ring-amber-500" : "bg-amber-400/10 border-transparent text-white ring-1 ring-amber-400/50") : (isLight ? "bg-slate-50 border-transparent text-slate-700 hover:bg-slate-100" : "bg-slate-950/50 border-transparent text-slate-400 hover:bg-slate-800")}`}>
                  <span className="truncate pr-2">{combo[safeLang]}</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedComboId === combo.id ? 'border-amber-500' : (isLight ? 'border-slate-300' : 'border-slate-700')}`}>
                    {selectedComboId === combo.id && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                  </div>
                </button>
              ))}
            </div>
            
            {selectedComboId && (
              <div className="relative mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Нақты мамандықтар (Міндетті емес)</label>
                <button type="button" onClick={() => setIsSpecDropdownOpen(!isSpecDropdownOpen)} className={`w-full py-4 px-5 rounded-[16px] text-left text-sm font-bold flex justify-between items-center transition-all ${isLight ? 'bg-slate-50 text-slate-900 hover:bg-slate-100' : 'bg-slate-950/50 text-slate-200 hover:bg-slate-800'}`}>
                  <span className="truncate">{selectedTargetSpecs.length === selectedComboSpecs.length ? "Барлық мамандықтар таңдалды" : `Таңдалды: ${selectedTargetSpecs.length} мамандық`}</span>
                  <span className="text-xs text-slate-400 transition-transform duration-200" style={{ transform: isSpecDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </button>

                {isSpecDropdownOpen && (
                  <div className={`absolute bottom-[calc(100%+8px)] z-50 w-full rounded-[24px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 border ${isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-900/95 border-white/10'}`}>
                    <input type="text" placeholder="Іздеу / Поиск..." value={specDropdownSearch} onChange={(e) => setSpecDropdownSearch(e.target.value)} className={`w-full p-3 mb-3 text-sm font-medium rounded-xl outline-none transition-all ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-slate-100' : 'bg-slate-950 text-white focus:bg-slate-800'}`} />
                    <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {selectedComboSpecs
                        .filter(s => `${s.code} ${s.name[safeLang]}`.toLowerCase().includes(specDropdownSearch.toLowerCase()))
                        .map(spec => {
                          const isChecked = selectedTargetSpecs.includes(spec.code);
                          return (
                            <label key={spec.code} className={`flex items-center gap-3 p-3 rounded-[12px] text-xs font-bold cursor-pointer transition-colors ${isLight ? 'hover:bg-slate-50 text-slate-700' : 'hover:bg-slate-800/50 text-slate-300'}`}>
                              <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-amber-500 border-amber-500' : (isLight ? 'border-slate-300 bg-white' : 'border-slate-600 bg-slate-950')}`}>
                                {isChecked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <input type="checkbox" checked={isChecked} className="hidden" onChange={() => { if (isChecked) { setSelectedTargetSpecs(selectedTargetSpecs.filter(c => c !== spec.code)); } else { setSelectedTargetSpecs([...selectedTargetSpecs, spec.code]); } }} />
                              <span className="font-mono text-amber-500">{spec.code}</span>
                              <span className="truncate">{spec.name[safeLang]}</span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button onClick={handleCalculate} className={`w-full py-5 text-base md:text-lg font-black rounded-[20px] transition-all active:scale-[0.98] uppercase tracking-widest outline-none border mt-auto shadow-lg flex items-center justify-center gap-3 ${isLight ? 'bg-slate-900 border-slate-900 text-white shadow-slate-900/20 hover:shadow-slate-900/30' : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-transparent shadow-amber-500/20 hover:shadow-amber-500/30'}`}>
              <span>VIP Талдауды көру</span> <span className="text-xl">🔒</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}