"use client";

interface HomeTabProps {
  isLight: boolean;
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ isLight, setActiveTab }: HomeTabProps) {
  return (
    <div className="w-full max-w-5xl mx-auto pt-4 pb-12 md:py-16 animate-in fade-in zoom-in-[0.98] duration-700 print:hidden relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120%] max-w-[600px] h-72 bg-amber-400/15 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="text-center space-y-5 md:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px] md:text-xs uppercase tracking-wide shadow-sm">
          <span className="animate-pulse">🛡️</span> Ресми мәліметтер 2025-2026
        </div>
        <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] px-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Грантқа түсу <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">сенімділігін</span> арттыр
        </h1>
        <p className={`text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed px-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          ҰБТ балыңызды енгізіп, автоматты статистиканы көріңіз немесе 100% дәлдікпен VIP-талдау алыңыз.
        </p>
        <div className="pt-2 pb-6">
          <button onClick={() => setActiveTab("calc")} className={`group relative inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-black rounded-[20px] md:rounded-full transition-all active:scale-95 shadow-xl overflow-hidden ${isLight ? 'bg-slate-900 text-white shadow-slate-900/20 hover:shadow-slate-900/30' : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30'}`}>
            Есептеуді бастау ➔
          </button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[320px] md:max-w-md mt-2 mb-12 cursor-pointer transition-transform hover:scale-105" onClick={() => setActiveTab("calc")}>
        <div className={`absolute -inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[32px] blur-xl opacity-20 animate-pulse`} />
        <div className={`relative p-5 rounded-[28px] border shadow-2xl flex flex-col gap-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 ${isLight ? 'bg-white/95 border-white backdrop-blur-xl' : 'bg-slate-900/90 border-slate-700 backdrop-blur-xl'}`}>
           <div className="flex justify-between items-center border-b pb-3 border-slate-100 dark:border-white/5">
              <div className="flex gap-2 items-center"><span className="text-xl">👑</span><div className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Сенің нәтижең</div></div>
              <div className="text-[10px] px-2.5 py-1 bg-emerald-500/10 text-emerald-500 font-bold rounded-lg uppercase tracking-wider">Дайын</div>
           </div>
           <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-[16px] bg-amber-500/10 flex items-center justify-center text-2xl">🎓</div>
              <div className="flex-1 space-y-2.5">
                 <div className={`h-2.5 w-3/4 rounded-full ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                 <div className={`h-2.5 w-1/2 rounded-full ${isLight ? 'bg-slate-100' : 'bg-slate-800'}`} />
              </div>
              <div className="text-2xl font-black text-emerald-500">99%</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 px-1">
        <div className={`p-5 md:p-6 rounded-3xl border text-left flex flex-col gap-2 transition-all ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 border-white/5'}`}>
          <div className="w-10 h-10 rounded-[14px] bg-blue-500/10 flex items-center justify-center text-blue-500 text-lg mb-1">🏛️</div>
          <h3 className={`text-sm md:text-base font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Барлық ЖОО базасы</h3>
          <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">Қазақстандағы барлық 116+ университеттер мен олардың талаптары.</p>
        </div>
        <div className={`p-5 md:p-6 rounded-3xl border text-left flex flex-col gap-2 transition-all ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 border-white/5'}`}>
          <div className="w-10 h-10 rounded-[14px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-lg mb-1">🎯</div>
          <h3 className={`text-sm md:text-base font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Дәлдікпен есептеу</h3>
          <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">Алдыңғы жылдардың статистикасына сүйене отырып талдау.</p>
        </div>
        <div className={`p-5 md:p-6 rounded-3xl border text-left flex flex-col gap-2 transition-all relative overflow-hidden ${isLight ? 'bg-slate-900 border-slate-800' : 'bg-gradient-to-br from-amber-500/20 to-amber-600/5 border-amber-500/30'}`}>
          <div className="absolute -right-4 -top-4 text-7xl opacity-[0.07] blur-[2px] pointer-events-none">👑</div>
          <div className="w-10 h-10 rounded-[14px] bg-white/10 flex items-center justify-center text-white text-lg relative z-10 mb-1">👑</div>
          <h3 className="text-sm md:text-base font-black text-white relative z-10 leading-tight">VIP Сарапшы</h3>
          <p className="text-[11px] md:text-xs text-slate-300 font-medium leading-relaxed relative z-10">Грантқа түсудің нақты, кепілдік берілген стратегиясын құру.</p>
        </div>
      </div>
    </div>
  );
}