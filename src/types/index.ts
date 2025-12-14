export type { LoginDTO, RegisterDTO } from "./auth.types";
export type { SendOtpDTO, VerifyOtpDTO } from "./otp.types";
export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      data?: never;
    };

export type ResponseError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    data?: never;
  };
};
