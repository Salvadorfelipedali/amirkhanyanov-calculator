import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ProfitInputs, Boosters, useProfitCalculator } from '@/hooks/useProfitCalculator';
import CustomSlider from '@/components/ui/CustomSlider';
import BoosterCheckbox from '@/components/ui/BoosterCheckbox';
import LevelCard from '@/components/ui/LevelCard';

const CalculatorScreen: React.FC = () => {
  // Состояние входных данных
  const [inputs, setInputs] = useState<ProfitInputs>({
    leadsPerMonth: 200,
    conversionRate: 10,
    averageCheck: 15000,
    profitMargin: 30
  });

  // Состояние бустеров
  const [boosters, setBoosters] = useState<Boosters>({
    trafficSource: false,
    leadRub: false,
    focusOnOne: false,
    salesScripts: false,
    aiAnalyzer: false
  });

  // Обновление входных данных
  const updateInput = useCallback((field: keyof ProfitInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  // Обновление бустеров
  const updateBooster = useCallback((booster: keyof Boosters, checked: boolean) => {
    setBoosters(prev => ({ ...prev, [booster]: checked }));
  }, []);

  // Расчёты
  const { currentProfit, potentialProfit, entrepreneurLevel, growthPercentage } = 
    useProfitCalculator(inputs, boosters);

  // Форматирование чисел
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}`;
  };

  return (
    <section id="calculator-screen" className="py-6 px-4 relative mobile-auto-height mobile-scroll-fix mobile-safe-area">
      {/* Контейнер с автоматической высотой */}
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            <span className="gradient-text">Калькулятор</span>
            <span className="text-white"> Реальной Прибыли</span>
          </h2>
        </motion.div>

        {/* Основной контент - адаптивная сетка */}
        <div className="space-y-6 xl:space-y-0 xl:grid xl:grid-cols-3 xl:gap-6 xl:items-stretch calculator-grid">
          {/* Первая колонка: Показатели */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="xl:flex xl:flex-col"
          >
            {/* Ползунки калькулятора */}
            <div className="bg-gray-900/60 p-4 rounded-xl backdrop-blur-sm border border-gray-800 xl:flex-1 xl:flex xl:flex-col">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Ваши показатели</h3>
              
              <div className="space-y-4 xl:flex-1">
                <CustomSlider
                  label="Количество заявок"
                  value={inputs.leadsPerMonth}
                  min={0}
                  max={2000}
                  step={10}
                  unit="в мес."
                  onChange={(value) => updateInput('leadsPerMonth', value)}
                />
                
                <CustomSlider
                  label="Конверсия"
                  value={inputs.conversionRate}
                  min={0}
                  max={80}
                  step={1}
                  unit="%"
                  onChange={(value) => updateInput('conversionRate', value)}
                  formatValue={formatPercentage}
                />
                
                <CustomSlider
                  label="Средний чек"
                  value={inputs.averageCheck}
                  min={1000}
                  max={1000000}
                  step={1000}
                  unit="₽"
                  onChange={(value) => updateInput('averageCheck', value)}
                  formatValue={formatCurrency}
                />
                
                <CustomSlider
                  label="Рентабельность"
                  value={inputs.profitMargin}
                  min={0}
                  max={80}
                  step={1}
                  unit="%"
                  onChange={(value) => updateInput('profitMargin', value)}
                  formatValue={formatPercentage}
                />
              </div>
            </div>
          </motion.div>

          {/* Вторая колонка: Бустеры */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="xl:flex xl:flex-col"
          >
            {/* Бустеры */}
            <div className="bg-gray-900/60 p-4 rounded-xl backdrop-blur-sm border border-gray-800 xl:flex-1 xl:flex xl:flex-col">
              <h4 className="text-lg md:text-xl font-bold text-white mb-4 text-center">Бустеры</h4>
              <div className="space-y-3 xl:flex-1 xl:flex xl:flex-col xl:justify-center">
                <BoosterCheckbox
                  label="Источник трафика"
                  description="+40% к заявкам"
                  checked={boosters.trafficSource}
                  onChange={(checked) => updateBooster('trafficSource', checked)}
                />
                
                <BoosterCheckbox
                  label="Лидоруб"
                  description="+20% к конверсии"
                  checked={boosters.leadRub}
                  onChange={(checked) => updateBooster('leadRub', checked)}
                />
                
                <BoosterCheckbox
                  label="Фокус на одном деле"
                  description="+15% к рентабельности"
                  checked={boosters.focusOnOne}
                  onChange={(checked) => updateBooster('focusOnOne', checked)}
                />
                
                <BoosterCheckbox
                  label="Скрипты продаж"
                  description="+25% к конверсии"
                  checked={boosters.salesScripts}
                  onChange={(checked) => updateBooster('salesScripts', checked)}
                />
                
                <BoosterCheckbox
                  label="Аналитика недели"
                  description="+10% к заявкам и рентабельности"
                  checked={boosters.aiAnalyzer}
                  onChange={(checked) => updateBooster('aiAnalyzer', checked)}
                />
              </div>
            </div>
          </motion.div>

          {/* Третья колонка: Итоги расчета */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="xl:flex xl:flex-col xl:space-y-4 space-y-4"
          >
            {/* Компактные результаты */}
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-xl backdrop-blur-sm border border-gray-800 xl:flex-1 xl:flex xl:flex-col xl:justify-center">
              <h4 className="text-lg font-bold text-white mb-4 text-center">Итоги расчета</h4>
              <div className="space-y-4 text-center">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Текущая прибыль</div>
                  <div className="text-xl md:text-2xl font-bold font-numbers text-gray-300">
                    {currentProfit.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Потенциальная прибыль</div>
                  <motion.div 
                    key={potentialProfit}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    className="text-2xl md:text-3xl font-bold font-numbers gradient-text"
                  >
                    {potentialProfit.toLocaleString('ru-RU')} ₽
                  </motion.div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Рост</div>
                  <motion.div 
                    key={growthPercentage}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    className="text-3xl md:text-4xl font-bold font-numbers gradient-text"
                  >
                    +{growthPercentage}%
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Карточка уровня */}
            <LevelCard 
              level={entrepreneurLevel}
              currentProfit={currentProfit}
              potentialProfit={potentialProfit}
            />
          </motion.div>
        </div>
        
        {/* CTA-кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-8 text-center"
        >
          <a
            href="https://denisamirkhanyan.ru/mm#popup:myform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-primary text-white font-bold text-lg md:text-xl px-8 py-4 md:px-12 md:py-5 rounded-2xl transition-all duration-300 glow-hover shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 mobile-touch cta-button"
            >
              Оставить заявку
            </motion.button>
          </a>
        </motion.div>
        
        {/* Дисклеймер */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800/50 backdrop-blur-sm">
            <p className="text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">
              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2 opacity-60"></span>
              Результаты калькулятора являются прогнозом на основании прошлой статистики и не являются гарантией будущих результатов. Индивидуальные результаты могут варьироваться.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalculatorScreen;
