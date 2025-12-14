import * as z from "zod";

// ✅ Password regex: At least 1 uppercase, 1 special char, 6–32 characters
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\{};':"|,.<>/?]).{6,32}$/;
// ✅ User activity status enum
export const userActivityStatusEnum = [
  "ACTIVE",
  "INACTIVE",
  "BLOCKED",
] as const;
// ✅ User role status enum
export const userRoleStatusEnum = [
  "USER",
  "ADMIN",
  "GUIDE",
  "SUPERADMIN",
] as const;
// ✅ Auth provider enum
export const authProviderEnum = ["GOOGLE", "FACEBOOK", "CREDENTIAL"] as const;

// ✅ User address schema
export const addressSchema = z.object({
  street: z.string({ error: "Street must be a string." }).optional(), // Optional street line
  city: z
    .string({ error: "City must be a string." })
    .min(1, { error: "City is required." }),
  division: z
    .string({ error: "Division must be a string." })
    .min(1, { error: "Division is required." }),
  postalCode: z.string({ error: "Postal code must be a string." }).optional(), // Optional postal code
  country: z
    .string({ error: "Country must be a string." })
    .min(1, { error: "Country is required." }),
});

// ✅ Auth provider sub-document schema
export const authProviderSchema = z.object({
  provider: z.enum(authProviderEnum),
  providerId: z
    .string({ error: "Authentication provided id must be a string." })
    .min(1, { error: "Provider ID is required." }),
});

// ✅ Main user creation schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        error: "Name is too short",
      })
      .max(50),
    email: z.email(),
    password: z.string().regex(passwordRegex, {
      error:
        "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character.",
    }),
    confirmPassword: z.string().regex(passwordRegex, {
      error:
        "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "Email is required" })
    .lowercase(),

  password: z.string().regex(passwordRegex, {
    error:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

export const changePasswordSchema = z.object({
  previousPassword: z.string().regex(passwordRegex, {
    error:
      "Previous password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
  latestPassword: z.string().regex(passwordRegex, {
    error:
      "Latest password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

export const setPasswordSchema = z.object({
  password: z.string().regex(passwordRegex, {
    error:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});
export const forgetPasswordSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "Email is required" })
    .lowercase(),
});
export const resetPasswordSchema = z.object({
  id: z
    .string({ error: "ID must be a string." })
    .min(1, { error: "ID is required." }),
  password: z.string().regex(passwordRegex, {
    error:
      "Password must be 6 - 32 characters long, include at least 1 uppercase letter and 1 special character",
  }),
});

export const verifyOTP = z.object({
  email: z
    .email({ error: "Email must a standard email format" })
    .min(1, { error: "Email is required." }),
  otp: z
    .string({ error: "OTP must be a string." })
    .min(1, { error: "OTP is required." })
    .max(6, "OTP must be in 6 characters"),
});

export const sendOTP = verifyOTP.pick({ email: true });
