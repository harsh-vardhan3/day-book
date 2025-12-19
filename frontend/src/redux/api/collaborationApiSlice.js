import apiSlice from "./apiSlice";

const collaborationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    shareEntry: builder.mutation({
      query: (data) => ({
        url: "/collaboration/share",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Entries"],
    }),

    unshareEntry: builder.mutation({
      query: (data) => ({
        url: "/collaboration/unshare",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Entries"],
    }),

    getSharedWithMe: builder.query({
      query: () => "/collaboration/shared-with-me",
      providesTags: ["Entries"],
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: "/collaboration/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    getComments: builder.query({
      query: (entryId) => `/collaboration/comments/${entryId}`,
      providesTags: ["Comments"],
    }),

    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/collaboration/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useShareEntryMutation,
  useUnshareEntryMutation,
  useGetSharedWithMeQuery,
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
} = collaborationApiSlice;
