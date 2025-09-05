import React from 'react';
import { motion } from 'framer-motion';
import LandingScreen from './components/LandingScreen';
import CalculatorScreen from './components/CalculatorScreen';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-50">
      {/* Анимированный фон */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '1px',
              height: `${50 + Math.random() * 100}px`,
              background: 'linear-gradient(135deg, #8A2BE2, #FF007A)',
            }}
            animate={{
              y: [-20, -50],
              x: [0, 30],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <LandingScreen />
      <CalculatorScreen />
    </div>
  );
}

export default App;