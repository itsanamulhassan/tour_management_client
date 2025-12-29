import { baseApi } from "@/redux/baseApi";

const tourApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTour: build.mutation({
      query: (data) => ({
        url: "tours/create",
        method: "POST",
        data,
      }),
    }),
    getTours: build.query({
      query: () => ({
        url: "tours/all",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    getTour: build.query({
      query: (id) => ({
        url: "tours/" + id,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
    }),
    removeTour: build.mutation({
      query: (id) => ({
        url: "tours/" + id,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetToursQuery } = tourApi;
