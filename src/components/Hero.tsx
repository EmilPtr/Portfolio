import ModelViewer from './ModelViewer';

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen flex flex-col md:flex-row bg-[#050505] overflow-hidden">
      {/* Left Half - Content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-[10%] md:px-[15%] z-10 relative border-r-0 md:border-r-4 border-white/30">
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 tracking-tighter mb-4">
          EmilPtr
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide max-w-lg">
          A high schooler with a passion for making
        </p>
      </div>

      {/* Right Half - 3D Viewer */}
      <div className="w-full md:w-1/2 h-full absolute md:relative inset-0 md:inset-auto opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <ModelViewer />
      </div>
    </section>
  );
}
