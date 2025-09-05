import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EntrepreneurLevel } from '@/hooks/useProfitCalculator';

interface LevelCardProps {
  level: EntrepreneurLevel;
  currentProfit: number;
  potentialProfit: number;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, currentProfit, potentialProfit }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={level.name}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-4 rounded-xl backdrop-blur-sm border border-transparent bg-clip-padding">
          <div 
            className="absolute inset-0 rounded-xl gradient-primary opacity-30 animate-pulse-glow"
            style={{ zIndex: -1 }}
          />
          <div className="bg-gray-900 rounded-xl p-4 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="text-3xl mb-2"
              >
                {level.icon}
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base font-bold gradient-text mb-1"
              >
                {level.name}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-xs leading-tight"
              >
                {level.description}
              </motion.p>
            </div>
            
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Диапазон уровня</div>
                <div className="font-numbers text-xs text-gray-300">
                  {level.range[1] === Infinity 
                    ? `от ${(level.range[0] / 1000000).toFixed(1)}М+`
                    : `${(level.range[0] / 1000000).toFixed(1)}М - ${(level.range[1] / 1000000).toFixed(1)}М`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelCard;