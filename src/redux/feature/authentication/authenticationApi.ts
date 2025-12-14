import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, LoginDTO } from "@/types";
import type { RegisterPayload } from "@/types/auth.types";

const authenticationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<RegisterPayload>, RegisterPayload>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation<null, LoginDTO>({
      query: (data) => ({
        url: "/auths/signin",
        method: "POST",
        data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authenticationApi;
