interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function Header({ activeTab, setActiveTab, theme, setTheme }: HeaderProps) {
  const isLight = theme === "light";

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${isLight ? 'bg-white/80 border-slate-100' : 'bg-slate-950/80 border-white/5'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
       <div className="flex items-center">
  <img 
    src="/logo.png" 
    alt="SENIM Logo" 
    // Мы радикально увеличили высоту (h-20 md:h-28) 
    // и добавили отрицательные маржины (-my-6), чтобы шапка не разъехалась
    className={`h-20 md:h-28 -my-6 w-auto object-contain transition-all origin-left hover:scale-105 ${theme === 'dark' ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] brightness-110' : ''}`}
  />
</div>
        
        <div className="flex items-center gap-5">
          <nav className={`hidden md:flex p-1.5 rounded-full transition-colors ${isLight ? 'bg-slate-100/80' : 'bg-slate-900'}`}>
            {[
              { id: "home", label: "Басты" },
              { id: "calc", label: "Калькулятор" },
              { id: "specs", label: "Мамандықтар" },
              { id: "unis", label: "ЖОО" },
              { id: "ai", label: "AI & Аналитика", icon: "🔒" }, // Поставили замок
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all outline-none flex items-center gap-2 ${activeTab === tab.id ? isLight ? "bg-white text-slate-900 shadow-sm" : "bg-slate-800 text-white shadow-md" : isLight ? "text-slate-500 hover:text-slate-800" : "text-slate-400 hover:text-white"}`}>
                {tab.icon && <span className={tab.id === 'ai' ? 'text-amber-500' : ''}>{tab.icon}</span>}
                {tab.label}
              </button>
            ))}
          </nav>

          <button onClick={() => setTheme(isLight ? "dark" : "light")} className={`p-3 rounded-full transition-all active:scale-95 outline-none text-base flex items-center justify-center ${isLight ? 'bg-slate-100 text-amber-500 hover:bg-slate-200' : 'bg-slate-900 text-amber-400 hover:bg-slate-800'}`}>
            {isLight ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </header>
  );
}