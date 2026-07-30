import { useEffect, useState } from 'react';

// Cache code to avoid re-fetching when cycling
let cachedCode = '';

export default function BackgroundCode({ forceEffectsEnabled = true }: { forceEffectsEnabled?: boolean }) {
  const [code, setCode] = useState<string>(cachedCode);

  useEffect(() => {
    if (cachedCode) return;
    fetch('/code.txt')
      .then((res) => res.text())
      .then((text) => {
        cachedCode = text;
        setCode(text);
      })
      .catch((err) => console.error('Failed to load code:', err));
  }, []);

  if (!code) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none opacity-80 font-mono text-xs md:text-sm whitespace-pre flex justify-center text-red-600 ${forceEffectsEnabled ? 'drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] contrast-125 brightness-110' : ''}`}>
      <div className="animate-scroll-slow w-full px-8">
        <div>{code}</div>
        <div>{code}</div>
      </div>
      {/* Subtle scanline overlay covering the entire viewport, not scrolling */}
      {forceEffectsEnabled && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />
      )}
    </div>
  );
}
