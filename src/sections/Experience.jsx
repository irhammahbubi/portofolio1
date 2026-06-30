import React, { useState } from 'react';
// WAJIB IMPORT: Untuk menembakkan modal foto keluar dari jebakan z-index parent/navbar
import { createPortal } from 'react-dom';

const Experience = () => {
  // STATE KENDALI: Melacak data pengalaman yang aktif diklik, index slide foto, dan skala zoom
  const [activeExp, setActiveExp] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);

  const experiences = [
    {
      year: "Nov 2025 - Feb 2026",
      role: "Product Service Consultant (Technical Support)",
      company: "PT Rimas Mandiri",
      points: [
        "Mendiagnosis dan memperbaiki kerusakan hardware serta jalur sirkuit elektronik PC/laptop menggunakan multimeter dan analisis skematik.",
        "Melakukan troubleshooting sistem operasi, pemulihan data, dan OS deployment menggunakan Ventoy serta DLC Boot dan software lainnya.",
        "Berkolaborasi dengan tim teknis lintas cabang untuk mempercepat penanganan masalah (downtime) sistem yang kompleks."
      ],
      // ➕ JALUR FOTO LOKAL (Silakan taruh fotonya di folder public/experience/)
      images: [
        "/experience/foto1-rimas.jpg",
        "/experience/foto2-rimas.jpg"
      ]
    },
    {
      year: "Aug 2024 - Jan 2026",
      role: "Head Assistant & Assistant Laboratorium",
      company: "Advanced Computer System Laboratory (ACSL) Universitas Gunadarma",
      points: [
        "Mengelola jadwal kerja dan pemeliharaan infrastruktur jaringan lab untuk 5+ asisten dan puluhan PC dengan target downtime 0%.",
        "Mengimplementasikan serta mengajar layanan jaringan (DNS, Web Server, Proxy, VPN) berbasis Apache dan Nginx saat praktikum.",
        "Mengonfigurasi dan menganalisis routing dinamis OSPF, firewall, serta hotspot gateway menggunakan MikroTik dan Wireshark.",
        "Menyusun dokumentasi teknis, modul praktikum, laporan insiden, dan inventarisasi aset laboratorium setiap bulan."
      ],
      images: [
        "/experience/acsl-depan.jpeg",
        "/experience/acsl1-belakang.png"
      ]
    },
    {
      year: "Aug 2020 - Sep 2021",
      role: "Technical Support Intern",
      company: "PT.Primalayan Citra Mandiri",
      points: [
        "Mendiagnosis dan memperbaiki kerusakan hardware/software pada unit laptop, desktop, dan All-in-One (AIO) sesuai standar vendor.",
        "Menangani tiket permintaan perbaikan untuk 10 hingga 20 perangkat setiap hari menggunakan tools diagnostik berlisensi.",
        "Melakukan perbaikan komponen tingkat lanjut untuk mempertahankan standar kualitas layanan (Service Level Agreement)."
      ],
      images: [
        "/experience/foto1-datascrip.jpg",
        "/experience/foto3-datascrip.jpg"
      ]
    },
    {
      year: "Nov 2018 - Jan 2019",
      role: "Information Technology Intern",
      company: "PT Inti Ganda Perdana (Astra Group)",
      points: [
        "Memberikan dukungan teknis L1 (Helpdesk) terkait masalah hardware, Windows OS, dan Microsoft Office untuk puluhan karyawan.",
        "Melakukan instalasi, konfigurasi, dan troubleshooting printer, scanner, serta perangkat periferal jaringan LAN/WLAN.",
        "Membantu teknisi senior dalam memelihara dan mengawasi stabilitas infrastruktur jaringan lokal perusahaan."
      ],
      images: [
        "/experience/astra-depan.jpg",
        "/experience/astra-belakang.jpg"
      ]
    }
  ];

  // Fungsi navigasi kontrol zoom panel
  const handleZoomIn = () => setZoomScale(prev => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setZoomScale(prev => Math.max(1, prev - 0.25));
  const handleZoomReset = () => setZoomScale(1);

  // Fungsi navigasi perpindahan halaman slide foto
  const handleNextSlide = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setCurrentSlide(prev => (prev + 1) % activeExp.images.length);
  };

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setCurrentSlide(prev => (prev - 1 + activeExp.images.length) % activeExp.images.length);
  };

  return (
    <section id="experience" className="scroll-mt-24 space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">Experience</h2>
      <div className="space-y-6 relative border-l border-gray-800 ml-4 pl-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative group">
            
            {/* Indikator timeline */}
            <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#03010A] transition-all ${index === 0 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-gray-700'}`} />
            
            {/* Baris Atas: Tahun & Tombol Dokumentasi Kustom */}
            <div className="flex items-center justify-between gap-4 flex-wrap mb-1">
              <span className="text-xs font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                {exp.year}
              </span>
              
              {/* TOMBOL DOKUMENTASI (Hanya muncul jika array gambar diisi file) */}
              {exp.images && exp.images.length > 0 && (
                <button
                  onClick={() => {
                    setActiveExp(exp);
                    setCurrentSlide(0);
                    setZoomScale(1);
                  }}
                  className="bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-400 border border-cyan-900/50 hover:border-cyan-500/50 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1"
                >
                  📸 Dokumentasi ({exp.images.length})
                </button>
              )}
            </div>

            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
            <p className="text-sm text-gray-400 mb-4">{exp.company}</p>
            
            {/* MENGGUNAKAN FLEX LAYOUT UNTUK BULLET KUSTOM */}
            <div className="space-y-3 w-full">
              {exp.points.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 w-full">
                  <span className="text-gray-400 select-none pt-0.5">•</span>
                  <p className="text-sm text-gray-300 text-justify leading-relaxed w-full">
                    {point}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* =========================================================
         FULLSCREEN LIGHTBOX SLIDER SYSTEM (KASTA TERTINGGI z-70)
         ========================================================= */}
      {activeExp && createPortal(
        <div 
          className="fixed inset-0 z-70 bg-black/95 flex flex-col items-center justify-center p-4 select-none animate-fade-in"
          onClick={() => setActiveExp(null)}
        >
          {/* Top Floating Control Bar Panel */}
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
            onClick={() => setActiveExp(null)}
            className="absolute top-6 right-6 z-80 bg-gray-900/80 border border-gray-800 hover:bg-rose-500/20 hover:text-rose-400 text-gray-300 w-10 h-10 rounded-full flex items-center justify-center shadow-xl text-lg transition-all cursor-pointer"
          >
            ✕
          </button>

          {/* Floating Text Info Atas */}
          <div className="absolute top-20 text-center max-w-md px-4 z-80 pointer-events-none">
            <h4 className="text-sm font-bold text-white">{activeExp.role}</h4>
            <p className="text-xs text-gray-400 mt-0.5">{activeExp.company}</p>
          </div>

          {/* Indikator Angka Halaman Slider */}
          {activeExp.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-80 bg-gray-900/80 border border-gray-800/60 px-4 py-1.5 rounded-full text-xs font-mono text-gray-400">
              Dokumentasi <span className="text-cyan-400 font-bold">{currentSlide + 1}</span> dari {activeExp.images.length}
            </div>
          )}

          {/* Navigasi Slider Panah: Kiri */}
          {activeExp.images.length > 1 && (
            <button 
              onClick={handlePrevSlide}
              className="absolute left-4 sm:left-8 z-80 bg-gray-900/60 hover:bg-cyan-500/20 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-800 transition-all cursor-pointer shadow-2xl animate-fade-in"
            >
              ◀
            </button>
          )}

          {/* Navigasi Slider Panah: Kanan */}
          {activeExp.images.length > 1 && (
            <button 
              onClick={handleNextSlide}
              className="absolute right-4 sm:right-8 z-80 bg-gray-900/60 hover:bg-cyan-500/20 hover:text-cyan-400 text-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-800 transition-all cursor-pointer shadow-2xl animate-fade-in"
            >
              ▶
            </button>
          )}

          {/* Area Render Utama Kanvas Gambar Dokumentasi */}
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4 pt-28 sm:p-12 sm:pt-24">
            <img 
              src={activeExp.images[currentSlide]} 
              alt={`Work Gallery documentation slide ${currentSlide + 1}`} 
              style={{ 
                transform: `scale(${zoomScale})`, 
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
              className={`max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl origin-center transition-all ${
                zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (zoomScale > 1) handleZoomReset();
                else setZoomScale(1.75); // Klik instan memperbesar gambar otomatis 1.75x lipat
              }}
              onError={(e) => {
                // Fail-safe jika file foto fisik belum kamu taruh di folder public/experience/
                e.target.src = "https://placehold.co/800x600/0d0b14/22d3ee?text=Foto+Kegiatan+Belum+Diupload";
              }}
            />
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Experience;