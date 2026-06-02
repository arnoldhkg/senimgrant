"use client";
import { useState, useMemo } from "react";
import { UNIS } from "@/lib/data";

export default function UnisTab({ isLight, setSelectedUni }: any) {
  const [uniSearch, setUniSearch] = useState("");
  const [uniCity, setUniCity] = useState("");
  
  const uniqueCities = useMemo(() => Array.from(new Set(UNIS.map(u => u.city))), []);
  const filteredUnis = useMemo(() => {
    return UNIS.filter(u => {
      const matchQuery = `${u.name} ${u.code} ${u.city}`.toLowerCase().includes(uniSearch.toLowerCase());
      return matchQuery && (uniCity ? u.city === uniCity : true);
    });
  }, [uniSearch, uniCity]);

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full print:hidden max-w-5xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className={`text-3xl md:text-5xl font-black tracking-tight mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>Барлық <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Университеттер</span></h1>
        <p className={`text-sm font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Қазақстандағы 116+ жоғары оқу орындарының базасы</p>
      </div>

      <div className={`border rounded-[32px] p-6 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}>
        <input type="text" placeholder="Университет атауы немесе қаласы (Мысалы: SDU, Алматы)..." value={uniSearch} onChange={(e) => setUniSearch(e.target.value)} className={`w-full rounded-2xl py-4 px-5 outline-none text-sm font-bold transition-all focus:ring-2 mb-4 ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-white focus:ring-blue-500/20 placeholder:text-slate-400' : 'bg-slate-950/50 text-white focus:bg-slate-950 focus:ring-blue-500/20 placeholder:text-slate-600'}`} />
        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setUniCity("")} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold outline-none transition-all ${!uniCity ? (isLight ? 'bg-slate-900 text-white shadow-md' : 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/50') : (isLight ? 'bg-slate-50 text-slate-500 hover:bg-slate-100' : 'bg-slate-950/50 text-slate-400 hover:bg-slate-800')}`}>Барлық қалалар</button>
          {uniqueCities.map(city => (
            <button key={city} onClick={() => setUniCity(city)} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold outline-none transition-all ${uniCity === city ? (isLight ? 'bg-slate-900 text-white shadow-md' : 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/50') : (isLight ? 'bg-slate-50 text-slate-500 hover:bg-slate-100' : 'bg-slate-950/50 text-slate-400 hover:bg-slate-800')}`}>{city}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredUnis.map(uni => (
          <div key={uni.code} onClick={() => setSelectedUni(uni)} className={`cursor-pointer border rounded-[24px] p-6 flex flex-col shadow-sm transition-all hover:scale-[1.02] ${isLight ? 'bg-white border-slate-100 hover:border-blue-400' : 'bg-slate-900/50 border-white/5 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]'}`}>
            <div className="flex justify-between items-start gap-4 mb-3">
              <div className={`text-base font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{uni.name}</div>
              <div className={`text-[10px] px-2.5 py-1 rounded-lg font-black tracking-widest shrink-0 ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-300'}`}>{uni.code}</div>
            </div>
            <div className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">📍 {uni.city} • {uni.type}</div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {uni.focus.slice(0, 2).map(f => <span key={f} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10">{f}</span>)}
              {uni.dorm && <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">🏠 Жатақхана</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}