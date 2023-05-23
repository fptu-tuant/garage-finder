import { useState } from 'react';

export function useStep(maxStep: number) {
  const [currentStep, setCurrentStep] = useState(1);

  return [
    currentStep,
    {
      canNext: currentStep + 1 < maxStep,
      canPrev: currentStep - 1 > 0,
      next: () => setCurrentStep(Math.max(currentStep + 1, maxStep)),
      prev: () => setCurrentStep(Math.min(currentStep - 1, 1)),
    },
  ] as const;
}
