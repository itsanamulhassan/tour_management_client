import type { sendOTP, verifyOTP } from "@/schemas";
import z from "zod";

export type SendOtpDTO = z.infer<typeof sendOTP>;
export type VerifyOtpDTO = z.infer<typeof verifyOTP>;
