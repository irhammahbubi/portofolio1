import React from 'react';

const Skills = () => {
  // 1. DATA SKILL DETAIL (Tetap utuh sesuai kategori asli kamu)
  const skillCategories = [
    {
      icon: "🖥️",
      title: "Operating Systems",
      skills: ["Windows Server", "Linux Administration", "Windows 10/11", "MacOS"]
    },
    {
      icon: "🌐",
      title: "Networking & Infrastructure",
      skills: ["TCP/IP", "Mikrotik Configuration", "Unifi", "Cisco", "LAN/WAN", "DHCP/DNS", "VPN Setup", "Grafana (Monitoring)"],
      colorCyan: true // Warna Cyan
    },
    {
      icon: "🛡️",
      title: "IT Support & Virtualization",
      skills: ["Active Directory", "Virtualization (Proxmox/VMware)", "aaPanel / Nginx", "RMM Tools", "GLPI Ticketing System", "AnyDesk / TeamViewer"]
    },
    {
      icon: "🛠️",
      title: "Hardware Maintenance",
      skills: ["PC Assembly", "Server Rack Mounting", "CCTV Installation", "Printer Troubleshooting"],
      colorCyan: true // Warna Cyan
    },
    {
      icon: "🚀",
      title: "Development & Automation",
      skills: ["Docker & Containerization", "Git / GitHub", "Bash Scripting", "React.js & Vite", "Tailwind CSS"]
    }
  ];

  // 2. DATA LOGO MARQUEE
  const loopLogos = [
    { iconPath: "/icons/linux.svg", name: "Linux" },
    { iconPath: "/icons/windows1.svg", name: "Windows" },
    { iconPath: "/icons/proxmox.svg", name: "Proxmox" },
    { iconPath: "/icons/mikrotik1.svg", name: "Mikrotik" },
    { iconPath: "/icons/cisco1.svg", name: "Cisco" },
    { iconPath: "/icons/vmware1.svg", name: "Vmware" },
    { iconPath: "/icons/docker.svg", name: "Docker" },
    { iconPath: "/icons/cloudflare.svg", name: "Cloudflare" },
    { iconPath: "/icons/mysql1.svg", name: "MySql" },
    { iconPath: "/icons/git.svg", name: "Git" },
    { iconPath: "/icons/unifi.svg", name: "Unifi" },
    { iconPath: "/icons/react1.svg", name: "React" },
    { iconPath: "/icons/tailwind.svg", name: "Tailwind" },
  ];

  // Menggandakan array agar loop berjalan mulus tanpa patah (Infinite Effect)
  const duplicatedLogos = [...loopLogos, ...loopLogos, ...loopLogos];

  return (
    <section id="skills" className="scroll-mt-24 space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">Technical Skills</h2>
      
      {/* =========================================================
         BAGIAN A: INFINITE LOGO MARQUEE (SUDAH FIX TERANG & RESPONSIVE)
         ========================================================= */}
      <div className="bg-gray-950/40 border border-gray-800/80 rounded-2xl overflow-hidden relative isolate max-w-full">
        
        {/* Penanda Judul Kecil */}
        <span className="absolute top-2 left-3 text-[9px] font-black uppercase tracking-widest text-black bg-cyan-400 px-2.5 py-1 rounded-md z-10 select-none shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          Core Tech Stack
        </span>

        {/* Jalur Marquee: Gap menyusut di mobile (gap-6) dan melebar di desktop (md:gap-12) */}
        <div className="flex items-center gap-6 md:gap-12 py-7 md:py-9 animate-scroll whitespace-nowrap min-w-max hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3 shrink-0 group select-none px-2 md:px-4">
              
              {/* 🛠️ FIX VISIBILITAS: Default diatur opacity-75 agar langsung terang & jelas di layar HP/PC */}
              <img 
                src={logo.iconPath} 
                alt={logo.name} 
                className="w-7 h-7 md:w-9 md:h-9 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_8px_#22d3ee)] transition-all duration-300" 
                onError={(e) => {
                  // Fallback jika logo belum ada di folder public/icons
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${logo.name}&backgroundColor=0d0b14`;
                }}
              />
              
              {/* Nama teks teknologi samping logo */}
              <span className="text-xs md:text-sm font-mono font-bold text-gray-400 group-hover:text-cyan-400 transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Efek Gradasi Bayangan Samping (Fade Blur) agar tidak kaku terpotong di pinggir layar */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#03010A] via-[#03010A]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#03010A] via-[#03010A]/50 to-transparent pointer-events-none z-10" />
      </div>

      {/* =========================================================
         BAGIAN B: CATEGORIZED GRID DETAILS (RESPONSIVE GRID)
         ========================================================= */}
      {/* Otomatis 1 kolom di HP (grid-cols-1) dan berubah 2 kolom di tablet/PC (sm:grid-cols-2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="bg-gray-900/20 border border-gray-800/50 backdrop-blur-md p-4 md:p-5 rounded-xl transition-all hover:border-cyan-500/40 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base md:text-lg font-bold text-white mb-3 leading-snug">
                {category.icon} {category.title}
              </h3>
              
              {/* Jejeran Badge Skill Kategori */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full border transition-all font-medium ${
                      category.colorCyan 
                        ? 'bg-cyan-950/30 border-cyan-800/40 text-cyan-300 hover:border-cyan-500/50'
                        : 'bg-gray-800/40 border-gray-700/60 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 border-t border-gray-950/60" />
          </div>
        ))}
      </div>

      {/* KODE ANIMASI INFINITE LOOP MARQUEE */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;