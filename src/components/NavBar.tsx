import { useEffect, useState } from 'react';
import { useEffects } from './EffectsContext';

export default function NavBar() {
  const [flicker, setFlicker] = useState(false);
  const [jitter, setJitter] = useState(false);
  const { effectsEnabled, toggleEffects } = useEffects();

  useEffect(() => {
    if (!effectsEnabled) {
      setFlicker(false);
      setJitter(false);
      return;
    }
    // Subtle flicker logic
    const flickerInterval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 50 + Math.random() * 100);
    }, 2000 + Math.random() * 3000);

    // Occasional jitter logic
    const jitterInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setJitter(true);
        setTimeout(() => setJitter(false), 30);
      }
    }, 5000);

    return () => {
      clearInterval(flickerInterval);
      clearInterval(jitterInterval);
    };
  }, [effectsEnabled]);

  return (
    <nav className={`fixed top-0 w-full h-[70px] z-50 flex items-center px-[10%] md:px-[15%] 
      bg-black/20 backdrop-blur-sm border-b border-red-900/50
      ${effectsEnabled ? 'before:absolute before:inset-0 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] before:bg-[length:100%_4px] before:pointer-events-none before:z-[-1]' : ''}
      ${flicker ? 'opacity-90' : 'opacity-100'}
      ${jitter ? '-translate-x-[1px]' : ''}
    `}>
      <div className="flex items-center w-full relative justify-center">
        {/* Home Link (Far Left) */}
        <div className="absolute left-0">
          <a 
            href="#home"
            className={`font-mono text-sm tracking-widest uppercase text-white/80 transition-colors duration-300 hover:text-red-500 drop-shadow-[0_0_2px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]
                      relative group ${effectsEnabled ? '' : 'before:hidden after:hidden drop-shadow-none hover:drop-shadow-none'}`}
            data-text="Home"
          >
            <span className="relative before:absolute before:inset-0 before:content-[attr(data-text)] before:-translate-x-[1px] before:text-blue-500/30 before:-z-10 before:pointer-events-none
                            after:absolute after:inset-0 after:content-[attr(data-text)] after:translate-x-[1px] after:text-red-500/30 after:-z-10 after:pointer-events-none" data-text="Home">
              Home
            </span>
            <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          </a>
        </div>

        {/* Other Links (Center) */}
        <ul className="flex space-x-8 md:space-x-12 font-mono text-xs md:text-sm tracking-widest uppercase">
          {['About', 'Projects', 'Contact'].map((item) => (
            <li key={item} className="relative group">
              <a 
                href={`#${item.toLowerCase()}`}
                className={`text-white/80 transition-colors duration-300 group-hover:text-red-500 drop-shadow-[0_0_2px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]
                          relative ${effectsEnabled ? '' : 'before:hidden after:hidden drop-shadow-none group-hover:drop-shadow-none'}`}
                data-text={item}
              >
                <span className="relative before:absolute before:inset-0 before:content-[attr(data-text)] before:-translate-x-[1px] before:text-blue-500/30 before:-z-10 before:pointer-events-none
                            after:absolute after:inset-0 after:content-[attr(data-text)] after:translate-x-[1px] after:text-red-500/30 after:-z-10 after:pointer-events-none" data-text={item}>
                  {item}
                </span>
              </a>
              {/* Animated Underline */}
              <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-red-500 group-hover:w-full transition-all duration-300 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            </li>
          ))}
        </ul>

        {/* Toggle Effects (Far Right) */}
        <div className="absolute right-0">
          <button 
            onClick={toggleEffects}
            className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-red-500 transition-colors duration-300 flex items-center gap-2"
          >
            <span>FX</span>
            <div className={`w-6 h-3 rounded-full flex items-center p-[2px] border transition-colors ${effectsEnabled ? 'border-red-500 bg-red-950/50' : 'border-white/30'}`}>
              <div className={`w-2 h-2 rounded-full bg-current transition-transform duration-300 ${effectsEnabled ? 'translate-x-3 bg-red-500' : 'translate-x-0 bg-white/50'}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}