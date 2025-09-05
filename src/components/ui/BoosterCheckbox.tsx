import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface BoosterCheckboxProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  delay?: number;
}

const BoosterCheckbox: React.FC<BoosterCheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay }}
      className="bg-gray-900/60 p-2.5 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div className="flex items-start gap-2">
        <div className="relative mt-0.5">
          <motion.div
            className={`w-4 h-4 rounded border transition-all duration-200 ${
              checked 
                ? 'gradient-primary border-transparent glow-primary' 
                : 'border-gray-600 bg-gray-800'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: checked ? 1 : 0,
                opacity: checked ? 1 : 0
              }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center w-full h-full"
            >
              <Check className="w-2.5 h-2.5 text-white" />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="flex-1">
          <h4 className={`text-xs font-semibold transition-colors leading-tight ${
            checked ? 'text-white' : 'text-gray-300'
          }`}>
            {label}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5 leading-tight">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BoosterCheckbox;