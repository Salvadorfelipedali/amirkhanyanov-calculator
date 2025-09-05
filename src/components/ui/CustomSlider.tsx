import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

interface CustomSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  formatValue
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleSliderChange = useCallback((values: number[]) => {
    const newValue = values[0];
    onChange(newValue);
    if (!isEditing) {
      setInputValue(newValue.toString());
    }
  }, [onChange, isEditing]);

  const handleInputFocus = useCallback(() => {
    setIsEditing(true);
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
      setInputValue(clampedValue.toString());
    } else {
      setInputValue(value.toString());
    }
    setIsEditing(false);
  }, [inputValue, min, max, onChange, value]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setInputValue(value.toString());
      setIsEditing(false);
    }
  }, [handleInputBlur, value]);

  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/60 p-4 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-gray-200 leading-tight">{label}</label>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              min={min}
              max={max}
              step={step}
              className="bg-gray-800 text-white px-3 py-1 rounded text-right font-numbers text-sm w-20 focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-touch"
              autoFocus
            />
          ) : (
            <button
              onClick={handleInputFocus}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors font-numbers text-right w-20 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mobile-touch"
            >
              {displayValue}
            </button>
          )}
          <span className="text-gray-400 text-sm w-12 text-left">{unit}</span>
        </div>
      </div>
      
      <div className="relative py-2">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
    </motion.div>
  );
};

export default CustomSlider;