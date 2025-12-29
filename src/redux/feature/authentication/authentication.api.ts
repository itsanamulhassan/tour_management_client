import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, LoginDTO, SendOtpDTO, VerifyOtpDTO } from "@/types";
import type { RegisterPayload } from "@/types/auth.types";

export const authenticationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<ApiResponse<RegisterPayload>, RegisterPayload>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        data,
      }),
    }),
    login: build.mutation<ApiResponse<LoginDTO>, LoginDTO>({
      query: (data) => ({
        url: "/auths/signin",
        method: "POST",
        data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/auths/signout",
        method: "POST",
      }),
    }),
    sendOtp: build.mutation<ApiResponse<SendOtpDTO>, SendOtpDTO>({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: build.mutation<ApiResponse<VerifyOtpDTO>, VerifyOtpDTO>({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
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
