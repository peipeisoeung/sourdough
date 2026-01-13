import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Starter {
  name: string;
  maturity: number;
  health: number;
  stage: 'INACTIVE' | 'EARLY_ACTIVATION' | 'MID_ACTIVATION' | 'NEARLY_ACTIVE' | 'ACTIVE' | 'PEAK';
}

interface StarterState {
  starter: Starter | null;
  createStarter: (name: string) => void;
  feedStarter: () => void;
  resetStarter: () => void;
}

const getStarterStage = (maturity: number) => {
  if (maturity < 10) return 'INACTIVE';
  if (maturity < 30) return 'EARLY_ACTIVATION';
  if (maturity < 60) return 'MID_ACTIVATION';
  if (maturity < 80) return 'NEARLY_ACTIVE';
  if (maturity < 100) return 'ACTIVE';
  return 'PEAK';
};

export const useStarterStore = create<StarterState>()(
  persist(
    (set) => ({
      starter: null,
      createStarter: (name: string) =>
        set({
          starter: { name, maturity: 0, health: 100, stage: getStarterStage(0) },
        }),

      feedStarter: () =>
        set((state) => {
          if (!state.starter) return state;
          const newMaturity = state.starter.maturity + 10;
          const newHealth = Math.min(state.starter.health + 5, 100);
          return {
            starter: {
              ...state.starter,
              maturity: newMaturity,
              health: newHealth,
              stage: getStarterStage(newMaturity),
            },
          };
        }),
      resetStarter: () => set({ starter: null }),
    }),
    {
      name: 'starter-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


