import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { EffectsProvider } from './components/EffectsContext';

function App() {
  return (
    <EffectsProvider>
      <main className="min-h-screen bg-[#050505] text-white">
        <NavBar />
        <Hero />
      </main>
    </EffectsProvider>
  )
}

export default App
