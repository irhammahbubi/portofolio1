import React from 'react';

const Contact = () => {
  const contactLinks = [
    {
      name: "Email",
      value: "irhammahbubi5@gmail.com", // Ganti dengan email aktif lu
      href: "mailto:irhammahbubi5@gmail.com",
      icon: "✉️",
      color: "hover:border-rose-500/40 hover:text-rose-400"
    },
    {
      name: "LinkedIn",
      value: "Ircham Machbubi", // Ganti sesuai nama LinkedIn lu
      href: "https://linkedin.com/in/irchammachbubi", // Ganti URL-nya
      icon: "💼",
      color: "hover:border-blue-500/40 hover:text-blue-400"
    },
    {
      name: "GitHub",
      value: "github.com/irhammahbubi", // Ganti sesuai username GitHub lu
      href: "https://github.com/irhammahbubi", // Ganti URL-nya
      icon: "💻",
      color: "hover:border-purple-500/40 hover:text-purple-400"
    },
    {
      name: "WhatsApp",
      value: "+62 8871-6357-96", // Ganti dengan nomor WA lu
      href: "https://wa.me/628871635796", // Ganti format link WA lu
      icon: "💬",
      color: "hover:border-emerald-500/40 hover:text-emerald-400"
    }
  ];

  return (
    <section id="contact" className="scroll-mt-24 space-y-8 pb-12">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">Contact Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* KOLOM KIRI: TEKS AJAKAN (Mengambil 1 kolom di desktop) */}
        <div className="space-y-3">
          <h3 className="text-xl font-black text-white tracking-tight">Let's Connect!</h3>
          <p className="text-sm text-white-400 leading-relaxed text-justify">
            Tertarik untuk bekerja sama atau membutuhkan dukungan IT di perusahaan Anda? Mari berdiskusi!. 
          </p>
          <div className="text-xs font-mono text-white-500 pt-2 flex items-center gap-2">
            <span>📍</span> Jakarta, Indonesia
          </div>
        </div>

        {/* KOLOM KANAN: KARTU KONTAK INTERAKTIF (Mengambil 2 kolom di desktop) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gray-900/20 border border-gray-800/60 p-4 rounded-xl flex items-center gap-4 transition-all duration-300 hover:bg-gray-900/40 transform hover:-translate-y-1 ${link.color}`}
            >
              {/* Bulatan Icon */}
              <div className="w-10 h-10 rounded-lg bg-gray-950 flex items-center justify-center text-lg shadow-inner">
                {link.icon}
              </div>
              {/* Detail Konten Teks */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
                  {link.name}
                </h4>
                <p className="text-sm font-semibold tracking-tight truncate mt-0.5">
                  {link.value}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>

      {/* FOOTER HAK CIPTA SEDERHANA */}
      <footer className="pt-16 border-t border-white-900 text-center text-xs font-mono text-white-600">
        © {new Date().getFullYear()} Ircham Machbubi. Powered by React & Tailwind.
      </footer>
    </section>
  );
};

export default Contact;