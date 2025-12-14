export type { LoginDTO, RegisterDTO } from "./auth.types";
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
