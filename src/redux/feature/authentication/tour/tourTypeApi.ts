import { baseApi } from "@/redux/baseApi";

const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTourType: build.mutation({
      query: (data) => ({
        url: "tour-types",
        method: "POST",
        data,
      }),
      transformResponse: (res) => res.data,
    }),
    getTourTypes: build.query({
      query: () => ({
        url: "tour-types",
      }),
      transformResponse: (res) => res.data,
    }),
    updateTourType: build.query({
      query: (id) => ({
        url: "tour-types" + id,
        method: "PATCH",
      }),
      transformResponse: (res) => res.data,
    }),
    getTourType: build.query({
      query: (id) => ({
        url: "tour-types/" + id,
      }),
      transformResponse: (res) => res.data,
    }),
    removeTourType: build.mutation({
      query: (id) => ({
        url: "tour-types" + id,
        method: "DELETE",
      }),
      transformResponse: (res) => res.data,
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypeQuery,
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
  useUpdateTourTypeQuery,
} = tourTypeApi;
