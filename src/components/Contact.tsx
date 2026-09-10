import { useEffects } from './EffectsContext';

export default function Contact() {
  const { effectsEnabled } = useEffects();

  const contactLinks = [
    { name: 'Email', value: 'emilsahel@gmail.com', href: 'mailto:emilsahel@gmail.com', description: 'Primary method of contact for formal inquiries.' },
    { name: 'Discord', value: 'limethederg', href: '#', description: 'Best for quick chats and collaboration.' },
    { name: 'LinkedIn', value: 'https://linkedin.com/in/emil-puthur', href: 'https://linkedin.com/in/emil-puthur', description: 'Professional profile and networking.' },
  ];

  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] px-[10%] md:px-[15%] pt-[100px] pb-20 border-t border-white/10">
      <div className="w-full max-w-4xl relative">
        <h2 className={`text-4xl md:text-6xl font-bold text-red-600 mb-12 tracking-tighter uppercase text-center
         `}>
          Contact
        </h2>
        
        <div className="grid gap-12">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block relative"
            >
              <div className="flex flex-col md:flex-row gap-6 p-8 border-2 border-red-500/50 bg-black/40 backdrop-blur-md relative overflow-hidden font-mono crt-text transition-all group-hover:border-red-500 group-hover:bg-black/60">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500" />

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-red-400 font-bold">
                      {link.name}
                    </span>
                    <span className="text-white/30 group-hover:text-red-500 transition-colors text-xs uppercase">
                      [ ACCESS LINK ]
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {link.value}
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                      {link.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic scanline effect on hover */}
                {effectsEnabled && (
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Global section decorative scanline */}
        {effectsEnabled && (
          <div className="absolute inset-0 pointer-events-none border border-red-500/10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] -z-10" />
        )}
      </div>
    </section>
  );
}
