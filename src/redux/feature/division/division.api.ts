import { baseApi } from "@/redux/baseApi";

const divisionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    AddDivision: build.mutation({
      query: () => ({
        url: "divisions",
        method: "POST",
      }),
      invalidatesTags: ["divisions"],
    }),
    getDivisions: build.query({
      query: () => ({
        url: "divisions",
      }),
      providesTags: ["divisions"],
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

export const { useAddDivisionMutation } = divisionApi;
