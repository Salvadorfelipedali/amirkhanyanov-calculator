import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LandingScreen: React.FC = () => {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('calculator-screen');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-6 md:py-12 relative mobile-auto-height mobile-safe-area mobile-top-fix">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Левая колонка: Фото Дениса */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center lg:justify-center lg:ml-8 order-first"
          >
            <div className="relative">
              <img
                src="/images/denis-amirkhanyanov.png"
                alt="Денис Амирханян"
                className="w-72 h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-3xl mobile-image-enhanced"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 0, 122, 0.3))'
                }}
              />
              {/* Глоу-эффект */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse-glow"
                style={{
                  background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(255, 0, 122, 0.1))'
                }}
              />
            </div>
          </motion.div>

          {/* Правая колонка: Текст с отступом справа */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-left md:text-center lg:text-left space-y-6 lg:pr-8 lg:pr-16"
          >
            {/* Заголовок */}
            <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mobile-text-boost">
              <span className="gradient-text">Плечо</span>
              <br />
              <span className="text-white">Амирханяна</span>
            </h1>

            {/* Описание */}
            <div className="space-y-3">
              <p className="text-base md:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-300 mobile-text-larger">
                В среднем <span className="font-bold text-white">10 часов</span>, проведённых с Денисом Амирханяном,<br className="hidden lg:block" />
                увеличивали чистую прибыль предпринимателя на{' '}
                <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold gradient-text inline-block transform hover:scale-105 transition-transform">
                  204%
                </span>
                <br />
                в течение <span className="font-bold text-white">2-х месяцев</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400 italic">
                *по опросам 280 предпринимателей
              </p>
            </div>

            {/* Кнопка */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={scrollToCalculator}
                className="gradient-primary text-white font-semibold text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 rounded-xl transition-all duration-300 hover:scale-105 glow-hover inline-flex items-center gap-2 group mobile-touch"
              >
                Перейти к калькулятору
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingScreen;