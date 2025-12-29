import { baseApi } from "@/redux/baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    AddDivision: build.mutation({
      query: (data) => ({
        url: "divisions",
        method: "POST",
        data,
      }),
      invalidatesTags: ["divisions"],
    }),
    getDivisions: build.query({
      query: () => ({
        url: "divisions",
      }),
      providesTags: ["divisions"],
      transformResponse: (res) => res?.data,
    }),
    getDivision: build.query({
      query: (id) => ({
        url: "divisions/" + id,
      }),
      providesTags: ["divisions"],
    }),
    removeDivision: build.mutation({
      query: (id) => ({
        url: "divisions/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["divisions"],
    }),
    updateDivision: build.mutation({
      query: (id) => ({
        url: "divisions/" + id,
        method: "PATCH",
      }),
      invalidatesTags: ["divisions"],
    }),
  }),
});

export const {
  useAddDivisionMutation,
  useGetDivisionQuery,
  useGetDivisionsQuery,
  useRemoveDivisionMutation,
  useUpdateDivisionMutation,
} = divisionApi;
