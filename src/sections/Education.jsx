import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Education = () => {
  // STATE KENDALI: Untuk melacak sertifikat yang aktif, index slide foto, dan skala zoom
  const [activeCert, setActiveCert] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);

  const educationData = [
    {
      period: "2021 - 2025",
      degree: "S1 - Sistem Komputer",
      institution: "Universitas Gunadarma",
      details: [
        "IPK 3.66/4.00",
        "Activities and societies: Assistant Laboratorium ACSL (Advanced Computer System Laboratory)",
        "• Writing a scientific paper titled 'MONITORING AND CONTROL SYSTEM OF TEMPERATURE AND PH IN A GOLDFISH AQUARIUM BASED ON INTERNET OF THINGS'",
        "• Writing a Thesis titled 'Temperature, Fish Feed, and Water Condition Monitoring System Using Fuzzy Logic in Guppy Fish Aquarium Based on Internet of Things'"
      ]
    },
    {
      period: "2017 - 2020",
      degree: "SMK - Teknik Komputer & Jaringan (TKJ)",
      institution: "SMK DINAMIKA PEMBANGUNAN 1 JAKARTA",
      details: [
        "Mempelajari dasar-dasar routing, switching, instalasi server Linux/Windows, serta perakitan hardware komputer."
      ]
    }
  ];

  // STRUKTUR DATA BARU: Mengubah 'image' menjadi array 'images' untuk menampung banyak foto
  const certifications = [
    { 
      name: "Occupation of Junior Computer Network Technician", 
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      // Masukkan 2 file foto (misal halaman depan dan halaman transkrip belakang)
      images: [
        "/certs/bnsp-depan.jpeg",
        "/certs/bnsp-belakang.jpeg"
      ] 
    }
  ];

  // Fungsi navigasi kontrol zoom panel
  const handleZoomIn = () => setZoomScale(prev => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setZoomScale(prev => Math.max(1, prev - 0.25));
  const handleZoomReset = () => setZoomScale(1);

  // Fungsi navigasi slide halaman foto
  const handleNextSlide = (e) => {
    e.stopPropagation(); // Biar overlay gak ikut menutup
    setZoomScale(1); // Reset zoom ke normal setiap kali ganti halaman
    setCurrentSlide(prev => (prev + 1) % activeCert.images.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setCurrentSlide(prev => (prev - 1 + activeCert.images.length) % activeCert.images.length);
  };

  return (
    <section id="education" className="scroll-mt-24 space-y-8">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">Education & Certifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: FORMAL EDUCATION */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">🎓 Formal Education</h3>
          <div className="space-y-6 border-l border-gray-800 pl-4 ml-2">
            {educationData.map((edu, index) => (
              <div key={index} className="relative space-y-2 group w-full">
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-gray-800 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_#22d3ee] transition-all" />
                <span className="text-xs font-mono text-cyan-400">{edu.period}</span>
                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                <p className="text-sm text-gray-400">{edu.institution}</p>
                
                <div className="space-y-2 w-full pt-1">
                  {edu.details.map((detail, i) => (
                    <p key={i} className="text-xs text-gray-400 text-justify leading-relaxed w-full">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM KANAN: CERTIFICATIONS */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">📜 Professional Certs</h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setActiveCert(cert);
                  setCurrentSlide(0); // Selalu mulai dari lembar pertama (index 0)
                  setZoomScale(1);
                }}
                className="bg-gray-900/30 border border-gray-800/40 backdrop-blur-md p-4 rounded-xl transition-all hover:border-cyan-500/50 hover:bg-gray-900/60 flex flex-col justify-center cursor-pointer group relative overflow-hidden select-none"
              >
                <h4 className="text-sm font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h4>
                <span className="text-[10px] text-cyan-500 font-mono mt-1">
                  Issued by {cert.issuer}
                </span>
                <span className="absolute bottom-2 right-3 text-[9px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  🔎 PREVIEW ({cert.images.length} Pgs)
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* =========================================================
         FULLSCREEN LIGHTBOX SLIDER OVERLAY (LEVEL KASTA z-70)
         ========================================================= */}
      {activeCert && createPortal(
        <div 
          className="fixed inset-0 z-70 bg-black/95 flex flex-col items-center justify-center p-4 select-none animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          {/* Top Control Bar Panel */}
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 z-80 flex items-center gap-4 bg-gray-900/90 border border-gray-800 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={handleZoomOut} 
              disabled={zoomScale === 1}
              className="text-gray-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-400 font-bold px-2 transition-colors cursor-pointer"
            >
              ➖
            </button>
            <span className="text-xs font-mono text-gray-300 font-bold min-w-[50px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button 
              onClick={handleZoomIn} 
              disabled={zoomScale === 3}
              className="text-gray-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-400 font-bold px-2 transition-colors cursor-pointer"
            >
              ➕
            </button>
            <div className="w-px h-4 bg-gray-800" />
            <button 
              onClick={handleZoomReset}
              className="text-xs font-bold text-gray-400 hover:text-white bg-gray-800 px-3 py-1 rounded-md transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Tombol Silang Keluar */}
          <button 
            onClick={() => setActiveCert(null)}
            className="absolute top-6 right-6 z-80 bg-gray-900/80 border border-gray-800 hover:bg-rose-500/20 hover:text-rose-400 text-gray-300 w-10 h-10 rounded-full flex items-center justify-center shadow-xl text-lg transition-all cursor-pointer"
          >
            ✕
          </button>

          {/* INDICATOR HALAMAN (Muncul di bagian bawah tengah) */}
          {activeCert.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-80 bg-gray-900/80 border border-gray-800/60 px-4 py-1.5 rounded-full text-xs font-mono text-gray-400">
              Halaman <span className="text-cyan-400 font-bold">{currentSlide + 1}</span> dari {activeCert.images.length}
            </div>
          )}

          {/* TOMBOL NAVIGASI SLIDE: KIRI (PREVIOUS) */}
          {activeCert.images.length > 1 && (
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 sm:left-8 z-80 bg-gray-900/60 hover:bg-cyan-500/20 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-800 transition-all cursor-pointer shadow-2xl"
            >
              ◀
            </button>
          )}

          {/* TOMBOL NAVIGASI SLIDE: KANAN (NEXT) */}
          {activeCert.images.length > 1 && (
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 sm:right-8 z-80 bg-gray-900/60 hover:bg-cyan-500/20 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-800 transition-all cursor-pointer shadow-2xl"
            >
              ▶
            </button>
          )}

          {/* Canvas Render Gambar Slider */}
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4 sm:p-12">
            <img 
              src={activeCert.images[currentSlide]} 
              alt={`Certificate Page ${currentSlide + 1}`} 
              style={{ 
                transform: `scale(${zoomScale})`, 
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl origin-center transition-opacity duration-300 ${
                zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (zoomScale > 1) handleZoomReset();
                else setZoomScale(1.75);
              }}
              onError={(e) => {
                e.target.src = "https://placehold.co/800x600/0d0b14/22d3ee?text=Foto+Scan+Halaman+Belum+Ada";
              }}
            />
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Education;