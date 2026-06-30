import React, { useEffect, useState, useRef } from 'react';

function ScrambledText({ text, speed = 40, delay = 200, className = "" }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&+=*';
  const [displayText, setDisplayText] = useState('');
  const iterations = useRef(0);

  useEffect(() => {
    let interval;
    
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              // Jika huruf sudah selesai didekripsi, tampilkan huruf aslinya
              if (index < iterations.current) {
                return text[index];
              }
              // Jaga agar spasi tetap berupa spasi
              if (char === ' ') return ' ';
              // Acak huruf sisanya
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });

        if (iterations.current >= text.length) {
          clearInterval(interval);
        }
        iterations.current += 1 / 2; // Mengatur kecepatan teks terbuka rapi
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return <span className={className}>{displayText || text}</span>;
}

export default ScrambledText;