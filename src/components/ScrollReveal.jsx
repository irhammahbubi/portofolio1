import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Posisi awal: Transparan & agak ke bawah 30px
      whileInView={{ opacity: 1, y: 0 }} // Saat masuk layar: Muncul penuh & ke posisi asli
      viewport={{ once: true, margin: "-100px" }} // Sekali muncul saja (once: true) agar tidak kedip-kedip saat di-scroll naik-turun
      transition={{ 
        duration: 0.5, // Durasi cepat (0.5 detik) agar rekruter tidak menunggu
        ease: [0.16, 1, 0.3, 1] // Transisi halus (cubic-bezier)
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;