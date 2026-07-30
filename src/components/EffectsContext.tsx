import { createContext, useContext, useState, type ReactNode } from 'react';

type EffectsContextType = {
  effectsEnabled: boolean;
  toggleEffects: () => void;
};

const EffectsContext = createContext<EffectsContextType>({
  effectsEnabled: true,
  toggleEffects: () => {},
});

export function EffectsProvider({ children }: { children: ReactNode }) {
  const [effectsEnabled, setEffectsEnabled] = useState(true);

  return (
    <EffectsContext.Provider value={{ effectsEnabled, toggleEffects: () => setEffectsEnabled(e => !e) }}>
      {children}
    </EffectsContext.Provider>
  );
}

export function useEffects() {
  return useContext(EffectsContext);
}
