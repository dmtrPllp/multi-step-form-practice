import { useOnboardingStore } from "@/features/onboarding/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useOnboardingRedirect = () => {
  const router = useRouter();
  const { firstName, lastName, password, repeatPassword } =
    useOnboardingStore();

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated()) {
      return;
    }

    if (!firstName || !lastName || !password || !repeatPassword) {
      router.push("/onboarding/name");
    }
  }, [firstName, lastName, password, repeatPassword, router]);
};

export const usePasswordStepRedirect = () => {
  const router = useRouter();
  const { firstName, lastName } = useOnboardingStore();

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated()) {
      return;
    }

    if (!firstName || !lastName) {
      router.push("/onboarding/name");
    }
  }, [firstName, lastName, router]);
};

export const useNameStepValidation = () => {
  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated()) {
      return;
    }
  }, []);
};
