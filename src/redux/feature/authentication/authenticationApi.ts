import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, LoginDTO, SendOtpDTO, VerifyOtpDTO } from "@/types";
import type { RegisterPayload } from "@/types/auth.types";

export const authenticationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<RegisterPayload>, RegisterPayload>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        data,
      }),
    }),
    login: builder.mutation<ApiResponse<LoginDTO>, LoginDTO>({
      query: (data) => ({
        url: "/auths/signin",
        method: "POST",
        data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auths/signout",
        method: "POST",
      }),
    }),
    sendOtp: builder.mutation<ApiResponse<SendOtpDTO>, SendOtpDTO>({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation<ApiResponse<VerifyOtpDTO>, VerifyOtpDTO>({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authenticationApi;
