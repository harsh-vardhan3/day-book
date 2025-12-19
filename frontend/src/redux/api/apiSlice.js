import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["User", "Entries", "Comments"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
