"use client";

import { z } from "zod";
import { onboardingSchema } from "../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "../../store";
import { usePasswordStepRedirect } from "@/hooks/usePersistIsHydrated";

const onboardingPasswordSchema = onboardingSchema.pick({
  password: true,
  repeatPassword: true,
});

type OnboardingPasswordSchema = z.infer<typeof onboardingPasswordSchema>;

export default function OnboardingPasswordForm() {
  const router = useRouter();
  const { setData, password, repeatPassword } = useOnboardingStore();

  usePasswordStepRedirect();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnboardingPasswordSchema>({
    resolver: zodResolver(onboardingPasswordSchema),
    defaultValues: {
      password: password || "",
      repeatPassword: repeatPassword || "",
    },
  });

  const onSubmit: SubmitHandler<OnboardingPasswordSchema> = (data) => {
    setData(data);
    router.push("/onboarding/username");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 rounded-lg shadow-md w-fit mx-auto"
    >
      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="repeatPassword">Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat Password"
          {...register("repeatPassword")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.repeatPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.repeatPassword && (
          <p className="mt-1 text-sm text-red-600">
            {errors.repeatPassword.message}
          </p>
        )}
      </div>

      <div className="w-fit flex flex-col gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
