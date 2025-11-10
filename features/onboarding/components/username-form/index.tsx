"use client";

import { z } from "zod";
import { onboardingSchema } from "../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "../../store";
import { useOnboardingRedirect } from "@/hooks/usePersistIsHydrated";

const onboardingUsernameSchema = onboardingSchema.pick({
  username: true,
  terms: true,
});

type OnboardingUsernameSchema = z.infer<typeof onboardingUsernameSchema>;

export default function OnboardingUsernameForm() {
  const router = useRouter();
  const { setData, resetData, ...restData } = useOnboardingStore();

  useOnboardingRedirect();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnboardingUsernameSchema>({
    resolver: zodResolver(onboardingUsernameSchema),
    defaultValues: {
      username: restData.username || "",
      terms: restData.terms || false,
    },
  });

  const onSubmit: SubmitHandler<OnboardingUsernameSchema> = (data) => {
    setData(data);
    console.log({ ...data, ...restData });
    resetData();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 rounded-lg shadow-md w-fit mx-auto"
    >
      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          placeholder="Username"
          {...register("username")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.username
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="terms">Terms</label>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("terms")}
            className={`mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
              errors.terms
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the Terms and Conditions
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
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
