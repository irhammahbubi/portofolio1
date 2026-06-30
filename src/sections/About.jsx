import React from 'react';

const About = () => {
  return (
    <section id="about" className="scroll-mt-24 space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-800 pb-2 text-cyan-400">About Me</h2>
      <div className="bg-gray-900/40 border border-gray-800/60 backdrop-blur-md p-6 rounded-2xl space-y-4 text-gray-300 leading-relaxed transition-all hover:border-cyan-800/50 hover:bg-gray-900/60">
        <p>
          Saya adalah seorang lulusan Sistem Komputer yang memiliki antusiasme tinggi di bidang infrastruktur IT dan jaringan. Melalui pengalaman praktis sebagai L1/L2 Technical Support dan Kepala Asisten Laboratorium Jaringan, saya terbiasa melakukan troubleshooting perangkat keras, sistem operasi Linux/Windows, hingga konfigurasi perangkat jaringan secara taktis. 
          Saya menggabungkan keahlian teknis dengan kemampuan komunikasi yang responsif untuk memastikan setiap gangguan sistem dapat diselesaikan dengan cepat demi menjaga kelancaran operasional pengguna.
        </p>
      </div>
    </section>
  );
};

export default About;