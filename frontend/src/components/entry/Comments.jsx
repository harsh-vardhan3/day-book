import { useState, useEffect } from "react";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../redux/api/collaborationApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const Comments = ({ entryId }) => {
  const [commentText, setCommentText] = useState("");
  const { data: commentsData, isLoading: loadingComments, refetch } = useGetCommentsQuery(entryId);
  const [addComment, { isLoading: addingComment }] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const user = useSelector((state) => state.user?.user);

  const comments = commentsData?.data || [];

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await addComment({
        entryId,
        content: commentText,
      }).unwrap();

      setCommentText("");
      toast.success("Comment added!");
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      toast.success("Comment deleted!");
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete comment");
    }
  };

  return (
    <div className="mt-6 pt-6 border-t">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="textarea textarea-bordered w-full mb-2"
          rows="3"
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          disabled={addingComment}
        >
          {addingComment ? "Adding..." : "Add Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {loadingComments ? (
          <p className="text-center text-gray-400">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-400">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-base-300 p-3 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  {comment.author?.firstName} {comment.author?.lastName}
                </p>
                <p className="text-sm mt-1">{comment.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>

              {user && comment.author._id === user._id && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  className="btn btn-xs btn-ghost text-error"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
