import { create } from "zustand";
import { OnboardingSchemaType } from "./schema";
import { persist, createJSONStorage } from "zustand/middleware";

type OnboardingStore = Partial<OnboardingSchemaType> & {
  setData: (data: Partial<OnboardingSchemaType>) => void;
  resetData: () => void;
};

const ONBOARDING_STORAGE_KEY = "onboarding-data";

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      setData: (data: Partial<OnboardingSchemaType>) =>
        set((state: OnboardingStore) => ({
          ...state,
          ...data,
        })),
      resetData: () =>
        set((state: OnboardingStore) => {
          const { setData: _, resetData: __, ...rest } = state;
          return Object.fromEntries(
            Object.keys(rest).map((key) => [key, undefined])
          ) as Partial<OnboardingStore>;
        }),
    }),
    {
      name: ONBOARDING_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state: OnboardingStore) => ({
        firstName: state.firstName,
        lastName: state.lastName,
        password: state.password,
        repeatPassword: state.repeatPassword,
        username: state.username,
        terms: state.terms,
      }),
    }
  )
);
