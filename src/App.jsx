import React, { useState, useEffect } from 'react';
import RotatingText from './components/RotatingText';
import ScrambledText from './components/ScrambledText';
import SplashCursor from './components/SplashCursor';
import GooeyNav from './components/GooeyNav';
import Lanyard from './components/Lanyard';
import Ferrofluid from './components/Ferrofluid';
import ScrollReveal from './components/ScrollReveal'; // ➕ 1. IMPORT COMPONENT SCROLL REVEAL DI SINI

// IMPORT SECTIONS 
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact'; 

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk kontrol Staggered Menu Mobile
  
  const jobs = ["Sholih", "IT Support", "IT Infrastructure", "System Administrator", "Network Engineer"];

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" }, 
  ];

  // DETEKSI UKURAN LAYAR REAL-TIME
  useEffect(() => {
    const checkScreenSize = () => {
      const mobileStatus = window.innerWidth < 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) setMenuOpen(false); // Tutup menu otomatis jika layar di-resize ke desktop
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-h-screen bg-[#03010A] text-white font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND EFFECT FOR DESKTOP */}
      {!isMobile && (
        <>
          <div className="fixed inset-0 z-0">
            <Ferrofluid
              colors={["#06b6d4", "#10b981", "#0891b2"]}
              backgroundColor="#03010A"
              speed={0.2}
              scale={1.1}
              turbulence={0.5}
              fluidity={0.1}
              glow={1.0}
              mouseInteraction={true}
              mouseStrength={0.8}
            />
          </div>
          <div className="opacity-40">
            <SplashCursor 
              RAINBOW_MODE={false} 
              COLOR="#22d3ee" 
              SPLAT_RADIUS={0.4} 
              DENSITY_DISSIPATION={2.5} 
            />
          </div>
        </>
      )}

      {/* BACKGROUND BACKUP FOR MOBILE */}
      {isMobile && (
        <div className="fixed inset-0 z-0 bg-radial-[at_top_right] from-cyan-950/20 via-[#03010A] to-[#03010A]" />
      )}

      {/* =========================================================
         NAVBAR ROUTING (DESKTOP VS STAGGERED MOBILE)
         ========================================================= */}
      {!isMobile ? (
        /* DESKTOP: Tetap menggunakan GooeyNav mewah */
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-[#0d0b14] px-4 py-2 rounded-full border border-gray-800/80 shadow-2xl shadow-black/50 isolate transform-gpu">
          <GooeyNav items={navItems} particleCount={4} animationTime={400} />
        </header>
      ) : (
        /* MOBILE: Tombol Pemicu Staggered Menu (Menu +) */
        <div className="fixed top-5 right-5 z-50">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-[#0d0b14]/90 backdrop-blur-md border border-gray-800 text-sm font-bold tracking-wider text-cyan-400 px-4 py-2 rounded-xl shadow-lg transition-all active:scale-95"
          >
            {menuOpen ? "Close ✕" : "Menu ➕"}
          </button>
        </div>
      )}

      {/* PANEL DRAWER STAGGERED MENU (HANYA MUNCUL DI MOBILE SAAT DIKLIK) */}
      <div 
        className={`fixed inset-0 z-40 bg-[#03010A]/95 backdrop-blur-lg flex flex-col justify-center px-10 transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="space-y-6 max-w-sm">
          {navItems.map((item, index) => (
            <div 
              key={index}
              style={{ transitionDelay: menuOpen ? `${index * 60}ms` : '0ms' }}
              className={`flex items-baseline gap-4 border-b border-gray-900 pb-3 transform transition-all duration-500 ${
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              {/* Nomor Indeks Pembantu Bergaya Modern */}
              <span className="text-xs font-mono text-cyan-500 font-bold">
                0{index + 1}
              </span>
              {/* Link Menu Utama */}
              <a 
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-black tracking-tight text-white hover:text-cyan-400 active:text-cyan-400 transition-colors uppercase"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-24 md:space-y-32 pb-32">
        
        {/* HERO SECTION (HOME) */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-24 md:pt-20">
          
          <div className="text-center md:text-left space-y-4 md:space-y-6 flex-1 min-w-0 order-2 md:order-1">
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-cyan-500 uppercase block leading-relaxed max-w-sm mx-auto md:mx-0">
              Halo, Saya Ircham Machbubi Sholih
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none whitespace-nowrap">
              <ScrambledText text="Ircham Machbubi" speed={40} delay={200} />
            </h1>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-400 min-h-[1.2em]">
              <RotatingText texts={jobs} className="" />
            </div>
            
            <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-medium text-center md:text-justify px-2 md:px-0">
              Lulusan Sistem Komputer yang berfokus pada manajemen infrastruktur IT, troubleshooting perangkat keras/lunak, dan pemeliharaan jaringan komputer dengan sertifikasi BNSP.
            </p>
            
            <div className="pt-2">
              <a 
                href="#download-cv" 
                className="inline-block bg-gray-900/80 border border-gray-800 hover:border-emerald-500/50 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Tombol aman! File CV bisa ditaruh di folder public kamu.');
                }}
              >
                Unduh CV
              </a>
            </div>
          </div>

          {/* SISI LANYARD / AVATAR */}
          {!isMobile ? (
            <div className="w-full h-[50svh] flex justify-center items-center flex-1 order-1 md:order-2">
              <Lanyard 
                position={[0, 0, 20]} 
                gravity={[0, -45, 0]} 
                lanyardWidth={1}
                frontImage="/ircham.jpg"
              />
            </div>
          ) : (
            <div className="w-32 h-32 mt-6 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 p-1 shadow-xl order-1 md:order-2 animate-pulse">
              <img 
                src="https://api.dicebear.com/7.x/bottts/svg?seed=Ircham" 
                alt="Avatar" 
                className="w-full h-full bg-[#0d0b14] rounded-full p-2"
              />
            </div>
          )}
          
        </section>

        {/* =========================================================
           PEMANGGILAN SECTIONS DENGAN EFEK SMOOTH SCROLL REVEAL 
           ========================================================= */}
        <ScrollReveal>
          <About />
        </ScrollReveal>

        <ScrollReveal>
          <Experience />
        </ScrollReveal>

        <ScrollReveal>
          <Skills />
        </ScrollReveal>

        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        <ScrollReveal>
          <Education />
        </ScrollReveal>

        <ScrollReveal>
          <Contact />
        </ScrollReveal>

      </div>
    </div>
  );
}

export default App;