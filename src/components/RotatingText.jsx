import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Ini yang tadi bikin error

function RotatingText({ texts = [], className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [texts]);

  if (texts.length === 0) return null;

  return (
    <div className={`inline-block overflow-hidden h-[1.2em] relative align-bottom ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="block whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default RotatingText;