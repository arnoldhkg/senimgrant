interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLight: boolean;
}

export default function MobileNav({ activeTab, setActiveTab, isLight }: MobileNavProps) {
  return (
    <nav className={`md:hidden fixed bottom-0 left-0 w-full border-t z-40 backdrop-blur-2xl transition-colors ${isLight ? 'bg-white/90 border-slate-100' : 'bg-slate-950/90 border-white/5'}`}>
      <div className="flex justify-between px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,16px))]">
        {[
          { id: "home", icon: "🏠", label: "Басты" },
          { id: "calc", icon: "🎯", label: "Есептеу" },
          { id: "specs", icon: "📚", label: "Мамандық" },
          { id: "unis", icon: "🏛", label: "ЖОО" },
          { id: "ai", icon: "🔒", label: "AI" }, // Поставили замок
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex flex-col items-center p-1.5 transition-all outline-none ${activeTab === tab.id ? isLight ? 'text-slate-900 font-black scale-105' : 'text-amber-400 scale-105' : 'text-slate-400 font-medium'}`}>
            <span className={`text-xl mb-1 transition-transform ${activeTab === tab.id ? '-translate-y-1' : ''}`}>{tab.icon}</span>
            <span className="text-[10px] tracking-wide">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}