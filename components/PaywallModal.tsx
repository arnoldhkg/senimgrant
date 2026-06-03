"use client";

interface PaywallModalProps {
  isOpen: boolean;
  hasPaid: boolean;
  isLight: boolean;
  promoInput: string;
  setPromoInput: (val: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  buyPromoWhatsApp: () => void;
}

export default function PaywallModal({ isOpen, hasPaid, isLight, promoInput, setPromoInput, onClose, onSubmit, buyPromoWhatsApp }: PaywallModalProps) {
  if (!isOpen || hasPaid) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className={`w-full max-w-[420px] rounded-[32px] p-8 text-center shadow-2xl relative ${isLight ? 'bg-white' : 'bg-slate-900 border border-white/10'}`}>
        
        <div className="text-5xl mb-4 animate-bounce">👑</div>
        <h2 className={`text-2xl font-black mb-3 tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Толық талдау</h2>
        <p className={`text-xs font-bold mb-8 leading-relaxed px-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Нақты гранттық мүмкіндіктеріңізді және жеке ұсыныстарды көру үшін промокод қажет.
        </p>

        <div className={`border-t border-b py-5 mb-8 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Жеке талдау құны</div>
          <div className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>1 990 ₸</div>
        </div>

        <button onClick={buyPromoWhatsApp} className="w-full py-4 mb-8 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold rounded-2xl transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 outline-none active:scale-95">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          WhatsApp арқылы промокод алу
        </button>

        <div className="relative flex items-center justify-center mb-8">
          <div className={`absolute w-full h-px ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}></div>
          <span className={`relative px-4 text-[10px] font-bold uppercase tracking-widest ${isLight ? 'bg-white text-slate-300' : 'bg-slate-900 text-slate-600'}`}>Немесе</span>
        </div>

        <div className="flex w-full gap-2 mb-6">
          <input type="text" placeholder="ПРОМОКОДТЫ ЕНГІЗІҢІЗ" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} className={`flex-1 min-w-0 border-2 rounded-2xl py-3.5 px-4 outline-none font-black uppercase text-xs transition-all focus:border-amber-500 text-center tracking-widest ${isLight ? 'bg-white border-slate-100 text-slate-900 placeholder:text-slate-300' : 'bg-slate-900 border-white/5 text-white placeholder:text-slate-600'}`} />
          <button onClick={onSubmit} className="shrink-0 px-6 py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-white text-sm font-black rounded-2xl transition-all active:scale-95 outline-none shadow-lg shadow-amber-500/30">Растау</button>
        </div>

        {/* НОВЫЙ БЛОК: Оплата и поддержка */}
        <div className={`pt-5 mb-5 border-t w-full flex flex-col gap-4 items-center ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
          <div className="flex flex-col items-center gap-2">
            <span className={`text-[9px] font-bold uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>Қауіпсіз төлем / Оплата</span>
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="px-2 py-1 bg-[#F14635] text-white text-[10px] font-bold rounded shadow-sm">Kaspi.kz</span>
              <span className="px-2 py-1 bg-[#007753] text-white text-[10px] font-bold rounded shadow-sm">Halyk</span>
              <span className="px-2 py-1 bg-[#22C55E] text-white text-[10px] font-bold rounded shadow-sm">Freedom</span>
              <span className="px-2 py-1 bg-black text-white text-[10px] font-bold rounded shadow-sm flex items-center gap-1"><svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.1-44.6-35.9-2.8-74.3 22.7-93.1 22.7-18.9 0-46.5-21-75.1-20.9-46.7 0-89 27-113.3 69.1-49.6 85.8-26.1 213 22 282.8 23.3 33.6 51 69.2 87.2 68 35.1-1.2 48.7-22.5 91.5-22.5 42.6 0 55.4 22.5 92.1 21.8 38.3-.6 62.3-33 85-66.2 26.5-38.6 37.3-76.1 38-78.1-1.1-.4-73.4-28.1-73.8-114zM242.3 88.4c21.8-26.4 36.4-63.1 32.4-99.7-30.8 1.2-69.5 20.4-92 46.9-19.9 23-37.1 60.5-32.3 96 34.3 2.7 70.1-16.7 91.9-43.2z"/></svg> Pay</span>
            </div>
          </div>
          
          <div className={`text-[10px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Сұрақтар бойынша: <a href="https://wa.me/87052230254" target="_blank" rel="noreferrer" className="text-[#25D366] font-bold hover:underline">WhatsApp-қа жазыңыз</a>
          </div>
        </div>

        <button onClick={onClose} className={`text-xs font-bold transition-colors ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'}`}>Жабу</button>
      </div>
    </div>
  );
}