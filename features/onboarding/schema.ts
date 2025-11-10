import { z } from "zod";

export const onboardingSchema = z.object({
  username: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  repeatPassword: z.string().min(8).max(50),
  terms: z.boolean().refine((terms) => terms, {
    message: "You must agree to the terms and conditions",
  }),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
