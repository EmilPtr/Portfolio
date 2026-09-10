import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import { EffectsProvider } from './components/EffectsContext';
import ProjectsPage from './components/projects/ProjectsPage';
import Contact from './components/Contact';
import About from './components/About';

function App() {
  return (
    <EffectsProvider>
      <Router>
        <main className="min-h-screen bg-[#050505] text-white">
          <NavBar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Router>
    </EffectsProvider>
  )
}

export default App
