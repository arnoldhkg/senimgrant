"use client";

export default function DetailModals({ isLight, lang, selectedSpec, setSelectedSpec, selectedUni, setSelectedUni }: any) {
  return (
    <>
      {/* Интерактивная модалка деталей СПЕЦИАЛЬНОСТИ */}
      {selectedSpec && (
        <div className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-[32px] p-6 md:p-8 relative border shadow-2xl ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/10'}`}>
            <div className="text-[11px] font-mono text-amber-500 font-black uppercase tracking-widest mb-3">{selectedSpec.code} • {selectedSpec.cat}</div>
            <h2 className={`text-2xl md:text-3xl font-black mb-4 leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedSpec.name[lang]}</h2>
            <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">{selectedSpec.desc[lang] || selectedSpec.desc['kk']}</p>
            
            <div className={`grid grid-cols-3 gap-4 border-t border-b py-5 mb-8 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="text-center"><span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Шекті балл</span><span className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedSpec.min}</span></div>
              <div className="text-center"><span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Грант саны</span><span className="text-xl font-black text-emerald-500">{selectedSpec.grants}</span></div>
              <div className="text-center"><span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Бағдарлы балл</span><span className="text-xl font-black text-amber-500">{selectedSpec.target}</span></div>
            </div>
            <button onClick={() => setSelectedSpec(null)} className={`w-full py-4 rounded-[16px] font-black text-sm transition-colors ${isLight ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>Жабу</button>
          </div>
        </div>
      )}

      {/* Интерактивная модалка деталей УНИВЕРСИТЕТА */}
      {selectedUni && (
        <div className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-[32px] p-6 md:p-8 relative border shadow-2xl ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-white/10'}`}>
            <div className="text-[11px] font-bold text-amber-500 uppercase tracking-widest mb-3">📍 {selectedUni.city} • {selectedUni.code}</div>
            <h2 className={`text-2xl md:text-3xl font-black mb-3 leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedUni.name}</h2>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-8">{selectedUni.type}</div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-sm font-bold border-b pb-3 border-slate-100 dark:border-white/5"><span className="text-slate-500">🏠 Жатақхана</span><span className={isLight ? 'text-slate-900' : 'text-white'}>{selectedUni.dorm ? "Бар" : "Жоқ"}</span></div>
              <div className="flex justify-between items-center text-sm font-bold border-b pb-3 border-slate-100 dark:border-white/5"><span className="text-slate-500">🪖 Әскери кафедра</span><span className={isLight ? 'text-slate-900' : 'text-white'}>{selectedUni.mil ? "Бар" : "Жоқ"}</span></div>
              {selectedUni.website && (
                <div className="flex justify-between items-center text-sm font-bold border-b pb-3 border-slate-100 dark:border-white/5">
                  <span className="text-slate-500">🌐 Ресми сайт</span>
                  <a href={selectedUni.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{selectedUni.website.replace('https://', '')}</a>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedUni.focus.map((f: string) => (
                <span key={f} className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-500/20 text-amber-600 dark:text-amber-400 bg-amber-500/10 uppercase tracking-wider">{f}</span>
              ))}
            </div>

            <button onClick={() => setSelectedUni(null)} className={`w-full py-4 rounded-[16px] font-black text-sm transition-colors ${isLight ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>Жабу</button>
          </div>
        </div>
      )}
    </>
  );
}