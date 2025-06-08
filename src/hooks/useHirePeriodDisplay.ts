import { useMemo } from "react";

interface UseHirePeriodDisplayProps {
  hire_period_days: number;
}

export const useHirePeriodDisplay = ({
  hire_period_days,
}: UseHirePeriodDisplayProps): string => {
  const hirePeriodDisplay = useMemo(() => {
    return `${hire_period_days} day hire period`;
  }, [hire_period_days]);

  return hirePeriodDisplay;
};
