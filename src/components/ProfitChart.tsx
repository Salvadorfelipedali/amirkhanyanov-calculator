import React from 'react';
import { motion } from 'framer-motion';

interface ProfitChartProps {
  currentProfit: number;
  potentialProfit: number;
  growthPercentage: number;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ 
  currentProfit, 
  potentialProfit, 
  growthPercentage 
}) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}М`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}к`;
    }
    return value.toString();
  };

  // Процент прогресса для анимации (основан на реальном росте)
  const progressPercentage = currentProfit > 0 
    ? Math.min((growthPercentage / 500) * 100, 100) // Максимальный рост 500% = 100% прогресса
    : Math.min((growthPercentage / 400) * 100, 100); // Для нулевой прибыли

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900/60 p-4 rounded-xl backdrop-blur-sm border border-gray-800"
    >
      <div className="text-center mb-3">
        <h3 className="text-base font-bold text-white mb-1">График роста</h3>
        <motion.div
          key={growthPercentage}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-bold gradient-text"
        >
          +{growthPercentage}%
        </motion.div>
      </div>

      {/* Визуальный график */}
      <div className="mb-3">
        <div className="relative h-16 bg-gray-800 rounded-lg overflow-hidden">
          {/* Фон с сеткой */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-gray-600"
                style={{ top: `${i * 33}%` }}
              />
            ))}
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-full border-l border-gray-600"
                style={{ left: `${i * 33}%` }}
              />
            ))}
          </div>
          
          {/* Анимированная линия роста */}
          <motion.div
            className="absolute bottom-0 left-0 h-1"
            initial={{ width: '10%', background: 'linear-gradient(90deg, #8A2BE2, #8A2BE2)' }}
            animate={{ 
              width: `${Math.max(progressPercentage, 15)}%`,
              background: progressPercentage > 30 
                ? 'linear-gradient(90deg, #8A2BE2, #FF007A, #FFD700)' 
                : 'linear-gradient(90deg, #8A2BE2, #FF007A)'
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              boxShadow: '0 0 10px rgba(255, 0, 122, 0.5)',
              borderRadius: '2px'
            }}
          />
          
          {/* Точки начала и конца */}
          <div className="absolute bottom-0.5 left-1 w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <motion.div 
            className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full gradient-primary glow-primary"
            initial={{ left: '10%' }}
            animate={{ left: `${Math.max(progressPercentage - 2, 13)}%` }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          
          {/* Метки */}
          <div className="absolute bottom-3 left-1 text-xs text-gray-400">Текущая</div>
          <motion.div 
            className="absolute bottom-3 text-xs text-gray-300"
            initial={{ left: '10%' }}
            animate={{ left: `${Math.max(progressPercentage - 10, 25)}%` }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            Потенциал
          </motion.div>
        </div>
      </div>

      {/* Показатели */}
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-xs text-gray-400 mb-0.5">Текущая</div>
          <motion.div 
            key={`current-${currentProfit}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold font-numbers text-gray-300"
          >
            {currentProfit.toLocaleString('ru-RU')} ₽
          </motion.div>
        </div>
        
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-xs text-gray-400 mb-0.5">Потенциальная</div>
          <motion.div 
            key={`potential-${potentialProfit}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-xs font-bold font-numbers gradient-text"
          >
            {potentialProfit.toLocaleString('ru-RU')} ₽
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfitChart;