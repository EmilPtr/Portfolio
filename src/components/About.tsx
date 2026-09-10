import { useEffects } from './EffectsContext';

export default function About() {
  const { effectsEnabled } = useEffects();

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-mono crt-text relative">
      <div className="max-w-3xl mx-auto px-[10%] md:px-0 pt-[100px] pb-32 space-y-20">
        
        {/* Header */}
        <header className="border-b-2 border-red-600 pb-2 mb-12 relative">
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tighter uppercase text-red-600
            ${effectsEnabled ? 'drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]' : ''}`}>
            About_Me
          </h1>
        </header>

        {/* 1. Overview */}
        <section id="overview" className="relative group">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white bg-red-600 px-3 py-1">
              01 // OVERVIEW
            </h2>
            <div className="flex-1 h-[1px] bg-white/20" />
          </div>

          <div className="p-6 border-2 border-white/20 bg-black/40 backdrop-blur-md relative overflow-hidden group-hover:border-red-500/50 transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500" />

            <div className="text-base md:text-lg text-white/80 font-light leading-relaxed whitespace-pre-wrap">
              [DUMMY TEXT — WRITE OVERVIEW HERE]
            </div>
          </div>
        </section>

        {/* 2. Small Gallery */}
        <section id="gallery" className="relative pt-4">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg md:text-xl font-bold text-white/60 uppercase tracking-widest">
              02 // GALLERY
            </h2>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square border-2 border-white/10 bg-white/5 relative group hover:border-red-500 transition-colors flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20 group-hover:border-red-500" />
                <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20 group-hover:border-red-500" />
                
                <span className="text-[10px] text-white/20 uppercase tracking-tighter group-hover:text-red-500/50 transition-colors">
                  [DUMMY IMAGE {i}]
                </span>

                {/* Scanline overlay for gallery boxes */}
                {effectsEnabled && (
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_2px] opacity-20" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Accolades */}
        <section id="accolades" className="relative pt-4 opacity-70">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest">
              Accolades
            </h2>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 border border-white/10 bg-black/40 text-[10px] text-white/40 hover:text-white/60 hover:border-white/20 transition-all text-center uppercase tracking-tighter">
                [DUMMY ACCOLADE {i}]
              </div>
            ))}
          </div>
        </section>

      </div>

      {effectsEnabled && (
        <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] z-[-1]" />
      )}
    </div>
  );
}
