import { baseApi } from "@/redux/baseApi";
import type { ApiResponse } from "@/types";
import type { CreateTourTypeDTO } from "@/types/tour.types";

const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTourType: build.mutation<
      ApiResponse<CreateTourTypeDTO>,
      CreateTourTypeDTO
    >({
      query: (data) => ({
        url: "tour-types",
        method: "POST",
        data,
      }),
      invalidatesTags: ["tour-types"],
    }),
    getTourTypes: build.query({
      query: () => ({
        url: "tour-types",
      }),
      providesTags: ["tour-types"],
      transformResponse: (res) => res.data,
    }),
    updateTourType: build.mutation({
      query: (id) => ({
        url: "tour-types/" + id,
        method: "PATCH",
      }),
      invalidatesTags: ["tour-types"],
      transformResponse: (res) => res.data,
    }),
    getTourType: build.query({
      query: (id) => ({
        url: "tour-types/" + id,
      }),
      providesTags: ["tour-types"],
      transformResponse: (res) => res.data,
    }),
    removeTourType: build.mutation({
      query: (id) => ({
        url: "tour-types/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["tour-types"],
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypeQuery,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
  useUpdateTourTypeMutation,
} = tourTypeApi;
