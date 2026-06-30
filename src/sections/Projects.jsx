import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // STATE BARU: Untuk mengontrol Lightbox Foto dan Skala Zoom
  const [lightboxImage, setLightboxImage] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);

  const projectsData = [
    {
      id: 1,
      title: "Enterprise Home Lab & Cloud Infrastructure",
      category: "Infrastructure",
      shortDesc: "Membangun pusat data dan infrastruktur jaringan lokal berbasis virtualisasi Proxmox VE menggunakan sistem operasi Ubuntu Linux. Mengintegrasikan manajemen web panel, DNS sinkhole, sistem pencadangan mandiri, serta mengamankan jalur akses luar menggunakan arsitektur Zero-Trust.",
      longDesc: "Proyek infrastruktur ini berjalan di atas hypervisor Proxmox VE dengan memanfaatkan arsitektur Linux Containers (LXC) and Virtual Machines (VM) berbasis Ubuntu Server untuk efisiensi resource yang maksimal. Seluruh manajemen web app dikelola terpusat via aaPanel, sistem filtrasi iklan/DNS diarahkan ke AdGuard Home, dan pencadangan foto privat diotomatisasi lewat Immich. Sisi keamanan akses luar dikunci total tanpa open-port publik menggunakan Cloudflare Tunnel dan mesh-VPN dari Tailscale.",
      image: "/proxmox.png", 
      tags: ["Proxmox VE", "Ubuntu Server", "Zero-Trust", "Tailscale", "Cloudflare Tunnel"],
      features: [
        "Orkestrasi mesin virtual dan container (LXC/VM) berbasis Ubuntu Linux di Proxmox VE",
        "Implementasi DNS Sinkhole lokal dan ad-blocking menggunakan AdGuard Home",
        "Penerapan remote access aman tanpa port-forwarding via Cloudflare Tunnels",
        "Konfigurasi secure mesh networking antar node server menggunakan Tailscale VPN",
        "Deployment private cloud backup menggunakan Immich-Server untuk automasi sinkronisasi data",
        "Monitoring resource, matriks, dan visualisasi performa server secara real-time via Grafana"
      ]
    },
    {
      id: 2,
      title: "Automated Metrics Monitoring with Grafana",
      category: "Monitoring",
      // Mengubah total deskripsi agar fokus ke data Grafana asli milik lu
      shortDesc: "Implementasi sistem monitoring performa infrastruktur server dan container secara terpusat menggunakan Grafana dan Prometheus di Ubuntu Linux. Mengumpulkan metrik vital seperti utilitas CPU, beban RAM, kapasitas storage, dan lalu lintas jaringan secara real-time.",
      longDesc: "Proyek ini dirancang untuk memberikan visibilitas penuh terhadap kesehatan seluruh node virtual (VM & LXC) yang berjalan di cluster Proxmox. Menggunakan Prometheus sebagai time-series database dan Node Exporter sebagai agen penarik metrik langsung dari OS Ubuntu Server, data dikirim secara aman untuk divisualisasikan ke dalam dashboard interaktif Grafana.",
      // TIPS: Masukkan screenshot Grafana lu (image_47963b.png) ke folder public, lalu panggil di sini
      image: "/grafana.png",
      tags: ["Grafana", "Prometheus", "Node Exporter", "Ubuntu Server", "Infrastruktur Monitoring"],
      features: [
        "Instalasi dan konfigurasi stack monitoring terpusat (Grafana & Prometheus) di Ubuntu Linux",
        "Deployment Node Exporter di setiap instance server untuk ekstraksi metrik hardware secara real-time",
        "Kustomisasi dashboard visual (Quick CPU / Mem / Disk, Sys Load, RAM Used, & Root FS) untuk analisis performa yang intuitif",
        "Konfigurasi ambang batas alert (Alerting Thresholds) untuk mendeteksi anomali utilisasi resource secara dini"
      ]
    }
  ];

  // Fungsi pembantu kendali zoom
  const handleZoomIn = () => setZoomScale(prev => Math.min(3, prev + 0.25));
  const handleZoomOut = () => setZoomScale(prev => Math.max(1, prev - 0.25));
  const handleZoomReset = () => setZoomScale(1);

  return (
    <section id="projects" className="scroll-mt-24 space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">Projects</h2>
      
      {/* GRID KARTU PROYEK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-gray-900/20 border border-gray-800/60 p-6 rounded-2xl space-y-4 hover:border-cyan-500/40 hover:bg-gray-900/30 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {project.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950/50 text-cyan-400 border border-cyan-800/40 px-2.5 py-1 rounded-md shrink-0">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed text-justify line-clamp-4">
                {project.shortDesc}
              </p>
            </div>

            <div>
              <hr className="border-gray-800/80 my-4" />
              <div className="flex flex-wrap gap-2 text-xs text-gray-400 font-mono">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && <span className="text-gray-700">•</span>}
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && <span className="text-gray-600 text-[10px] self-center">+{project.tags.length - 3} more</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
         1. POP-UP MODAL DETAIL (LEVEL TUMPULAN z-60)
         ========================================================= */}
      {selectedProject && createPortal(
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#0e0c15] border border-gray-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-rose-500/20 hover:text-rose-400 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-gray-800 transition-all"
            >
              ✕
            </button>

            {/* Banner Foto Project - Kita pasang cursor-zoom-in agar user tahu bisa diklik */}
            <div 
              className="w-full h-48 sm:h-64 bg-gray-950 relative overflow-hidden border-b border-gray-800/60 cursor-zoom-in group"
              onClick={() => {
                setLightboxImage(selectedProject.image);
                setZoomScale(1); // Reset skala ke awal setiap kali membuka gambar baru
              }}
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c15] to-transparent opacity-60" />
              <span className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest bg-cyan-500 text-black px-2.5 py-1 rounded-md">
                {selectedProject.category}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                <span className="bg-black/70 px-4 py-2 rounded-xl text-xs font-bold border border-gray-700 text-cyan-400 shadow-xl">🔍 Klik untuk Zoom In / Detail Gambar</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-gray-300 text-justify leading-relaxed">
                  {selectedProject.longDesc}
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                  🛠️ Key Deliverables & Configurations
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-gray-400 flex items-start gap-2 text-justify">
                      <span className="text-cyan-500 select-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-900">
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-mono bg-gray-900 border border-gray-800 text-gray-300 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* =========================================================
         2. FULLSCREEN LIGHTBOX PREVIEW SYSTEM (LEVEL KASTA TERATINGGI z-70)
         ========================================================= */}
      {lightboxImage && createPortal(
        <div 
          className="fixed inset-0 z-70 bg-black/95 flex flex-col items-center justify-center p-4 select-none animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          {/* Panel Kontrol Atas Kustom (Zoom In, Zoom Out, Persentase, Reset) */}
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 z-80 flex items-center gap-4 bg-gray-900/90 border border-gray-800 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Mencegah panel ikut menutup lightbox
          >
            <button 
              onClick={handleZoomOut} 
              disabled={zoomScale === 1}
              className="text-gray-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-gray-400 font-bold px-2 transition-colors cursor-pointer"
              title="Zoom Out"
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
              title="Zoom In"
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

          {/* Tombol Close Pojok Kanan Atas */}
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 z-80 bg-gray-900/80 border border-gray-800 hover:bg-rose-500/20 hover:text-rose-400 text-gray-300 w-10 h-10 rounded-full flex items-center justify-center shadow-xl text-lg transition-all cursor-pointer"
          >
            ✕
          </button>

          {/* Kanvas Pembungkus Gambar dengan Fitur Auto Scroll/Pan saat di-zoom */}
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4 sm:p-12">
            <img 
              src={lightboxImage} 
              alt="Zoomable Resource Preview" 
              style={{ 
                transform: `scale(${zoomScale})`, 
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' 
              }}
              className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl origin-center ${
                zoomScale > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Biar gak nutup overlay
                // Trik klik gambar: kalau lagi zoom besar balik ke awal, kalau lagi kecil otomatis zoom ke 1.75x
                if (zoomScale > 1) handleZoomReset();
                else setZoomScale(1.75);
              }}
            />
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Projects;