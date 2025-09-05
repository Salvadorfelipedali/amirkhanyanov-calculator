import { useMemo } from 'react';

export interface ProfitInputs {
  leadsPerMonth: number; // количество заявок в месяц
  conversionRate: number; // конверсия (%)
  averageCheck: number; // средний чек (руб.)
  profitMargin: number; // рентабельность (%)
}

export interface Boosters {
  trafficSource: boolean; // +40% к заявкам
  leadRub: boolean; // +20% к конверсии
  focusOnOne: boolean; // +15% к рентабельности
  salesScripts: boolean; // +25% к конверсии
  aiAnalyzer: boolean; // +10% к заявкам и +10% к рентабельности
}

export interface EntrepreneurLevel {
  name: string;
  description: string;
  range: [number, number];
  icon: string;
}

const ENTREPRENEUR_LEVELS: EntrepreneurLevel[] = [
  {
    name: 'Стажёр бизнеса',
    description: 'Учишься ставить процессы на рельсы',
    range: [200_000, 400_000],
    icon: '🎓'
  },
  {
    name: 'Охотник за сделками',
    description: 'Контролируешь лидов и держишь конверсию',
    range: [400_000, 800_000],
    icon: '🎯'
  },
  {
    name: 'Игрок рынка',
    description: 'Выстраиваешь отдел продаж и поток клиентов',
    range: [800_000, 1_500_000],
    icon: '🏆'
  },
  {
    name: 'Магнат ниши',
    description: 'Доминируешь на своём рынке',
    range: [1_500_000, 3_000_000],
    icon: '👑'
  },
  {
    name: 'Альфа-предприниматель',
    description: 'Становишься локальной легендой',
    range: [3_000_000, Infinity],
    icon: '⚡'
  }
];

export const useProfitCalculator = (inputs: ProfitInputs, boosters: Boosters) => {
  // Текущая прибыль БЕЗ бустеров (базовая формула)
  const currentProfit = useMemo(() => {
    const profit = inputs.leadsPerMonth * (inputs.conversionRate / 100) * inputs.averageCheck * (inputs.profitMargin / 100);
    return Math.round(profit);
  }, [inputs.leadsPerMonth, inputs.conversionRate, inputs.averageCheck, inputs.profitMargin]);

  // Потенциальная прибыль С УЧЕТОМ бустеров
  const potentialProfit = useMemo(() => {
    // Применяем бустеры к базовым показателям СНАЧАЛА
    let boostedLeads = inputs.leadsPerMonth;
    let boostedConversion = inputs.conversionRate;
    let boostedMargin = inputs.profitMargin;

    // Бустеры для заявок
    if (boosters.trafficSource) {
      boostedLeads *= 1.4; // +40%
    }
    if (boosters.aiAnalyzer) {
      boostedLeads *= 1.1; // +10%
    }

    // Бустеры для конверсии
    if (boosters.leadRub) {
      boostedConversion = Math.min(boostedConversion * 1.2, 80); // +20%, макс 80%
    }
    if (boosters.salesScripts) {
      boostedConversion = Math.min(boostedConversion * 1.25, 80); // +25%, макс 80%
    }

    // Бустеры для рентабельности
    if (boosters.focusOnOne) {
      boostedMargin = Math.min(boostedMargin * 1.15, 80); // +15%, макс 80%
    }
    if (boosters.aiAnalyzer) {
      boostedMargin = Math.min(boostedMargin * 1.1, 80); // +10%, макс 80%
    }

    // Рассчитываем прибыль с учётом бустеров
    const boostedBaseProfit = boostedLeads * (boostedConversion / 100) * inputs.averageCheck * (boostedMargin / 100);
    
    // ЗАТЕМ применяем мастермайнд-эффект к улучшенным показателям
    // Если нет бустеров - применяем к базовой прибыли
    const hasActiveBoosters = Object.values(boosters).some(Boolean);
    const baseForMastermind = hasActiveBoosters ? boostedBaseProfit : currentProfit;
    
    // Мастермайнд даёт рост 204% (итого x3.04)
    const finalPotentialProfit = baseForMastermind * 3.04;
    
    return Math.round(Math.max(finalPotentialProfit, currentProfit)); // Минимум = текущая прибыль
  }, [inputs, boosters, currentProfit]);

  // Определение уровня предпринимателя
  const entrepreneurLevel = useMemo(() => {
    for (const level of ENTREPRENEUR_LEVELS) {
      if (potentialProfit >= level.range[0] && potentialProfit < level.range[1]) {
        return level;
      }
    }
    return ENTREPRENEUR_LEVELS[ENTREPRENEUR_LEVELS.length - 1]; // Альфа-предприниматель
  }, [potentialProfit]);

  // Процент роста
  const growthPercentage = useMemo(() => {
    if (currentProfit === 0) return 204;
    const growth = ((potentialProfit - currentProfit) / currentProfit) * 100;
    return Math.round(Math.max(growth, 0)); // минимум 0%
  }, [currentProfit, potentialProfit]);

  return {
    currentProfit,
    potentialProfit,
    entrepreneurLevel,
    growthPercentage,
    ENTREPRENEUR_LEVELS
  };
};