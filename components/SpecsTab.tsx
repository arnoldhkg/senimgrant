"use client";
import { useState, useMemo } from "react";
import { SPECS } from "@/lib/data";

export default function SpecsTab({ isLight, lang, setSelectedSpec }: any) {
  const [specSearch, setSpecSearch] = useState("");
  const [specCat, setSpecCat] = useState("");
  
  const uniqueCats = useMemo(() => Array.from(new Set(SPECS.map(s => s.cat))), []);
  const filteredSpecs = useMemo(() => {
    return SPECS.filter(s => {
      const query = specSearch.toLowerCase();
      const queryCyrillic = query.replace(/b/g, 'в').replace(/m/g, 'м');
      const searchStr = `${s.name.kk} ${s.name.ru} ${s.code}`.toLowerCase();
      const matchQuery = searchStr.includes(query) || searchStr.includes(queryCyrillic);
      return matchQuery && (specCat ? s.cat === specCat : true);
    });
  }, [specSearch, specCat]);

  // Безопасный язык для базы данных
  const safeLang = lang === 'ru' ? 'ru' : 'kk';

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full print:hidden max-w-5xl mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className={`text-3xl md:text-5xl font-black tracking-tight mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>Барлық <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Мамандықтар</span></h1>
        <p className={`text-sm font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Қазақстандағы барлық мамандықтардың толық тізімі</p>
      </div>

      <div className={`border rounded-[32px] p-6 mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${isLight ? 'bg-white border-slate-100' : 'bg-slate-900 border-white/5'}`}>
        <input type="text" placeholder="Мамандық атауы немесе коды (Мысалы: В057)..." value={specSearch} onChange={(e) => setSpecSearch(e.target.value)} className={`w-full rounded-2xl py-4 px-5 outline-none text-sm font-bold transition-all focus:ring-2 mb-4 ${isLight ? 'bg-slate-50 text-slate-900 focus:bg-white focus:ring-amber-500/20 placeholder:text-slate-400' : 'bg-slate-950/50 text-white focus:bg-slate-950 focus:ring-amber-500/20 placeholder:text-slate-600'}`} />
        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
          <button onClick={() => setSpecCat("")} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold outline-none transition-all ${!specCat ? (isLight ? 'bg-slate-900 text-white shadow-md' : 'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/50') : (isLight ? 'bg-slate-50 text-slate-500 hover:bg-slate-100' : 'bg-slate-950/50 text-slate-400 hover:bg-slate-800')}`}>Барлығы</button>
          {uniqueCats.map(cat => (
            <button key={cat} onClick={() => setSpecCat(cat)} className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold outline-none transition-all ${specCat === cat ? (isLight ? 'bg-slate-900 text-white shadow-md' : 'bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/50') : (isLight ? 'bg-slate-50 text-slate-500 hover:bg-slate-100' : 'bg-slate-950/50 text-slate-400 hover:bg-slate-800')}`}>{cat}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpecs.map(spec => (
          <div key={spec.code} onClick={() => setSelectedSpec(spec)} className={`cursor-pointer border rounded-[24px] p-6 transition-all hover:scale-[1.02] flex flex-col shadow-sm ${isLight ? 'bg-white border-slate-100 hover:border-amber-400' : 'bg-slate-900/50 border-white/5 hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)]'}`}>
            <div className="text-[10px] text-amber-500 font-black tracking-widest uppercase mb-3 bg-amber-500/10 w-fit px-2 py-1 rounded-md">{spec.code} • {spec.cat}</div>
            <div className={`text-base font-black mb-6 flex-1 leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{spec.name[safeLang]}</div>
            <div className={`grid grid-cols-3 gap-2 border-t pt-4 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="text-center"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Шек</div><div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{spec.min}</div></div>
              <div className="text-center"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Грант</div><div className="text-sm font-black text-emerald-500">{spec.grants}</div></div>
              <div className="text-center"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Бағдар</div><div className="text-sm font-black text-amber-500">{spec.target}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}