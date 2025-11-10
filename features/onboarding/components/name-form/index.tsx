"use client";

import { z } from "zod";
import { onboardingSchema } from "../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "../../store";
import { useNameStepValidation } from "@/hooks/usePersistIsHydrated";

const onboardingNameSchema = onboardingSchema.pick({
  firstName: true,
  lastName: true,
});

type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;

export default function OnboardingNameForm() {
  const router = useRouter();
  const { setData, firstName, lastName } = useOnboardingStore();

  useNameStepValidation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingNameSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
    },
  });

  const onSubmit: SubmitHandler<OnboardingNameSchema> = (data) => {
    setData(data);
    router.push("/onboarding/password");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 rounded-lg shadow-md w-fit mx-auto"
    >
      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="firstName">First Name</label>
        <input
          placeholder="First Name"
          {...register("firstName")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.firstName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="w-fit flex flex-col gap-2">
        <label htmlFor="lastName">Last Name</label>
        <input
          placeholder="Last Name"
          {...register("lastName")}
          className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lastName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
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
