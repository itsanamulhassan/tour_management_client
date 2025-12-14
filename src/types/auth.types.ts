import type { loginSchema, registerSchema } from "@/schemas";
import z from "zod";

export type LoginDTO = z.infer<typeof loginSchema>;
export type RegisterDTO = z.infer<typeof registerSchema>;
export type RegisterPayload = Omit<RegisterDTO, "confirmPassword">;
