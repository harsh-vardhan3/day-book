import { useState } from "react";
import { useShareEntryMutation } from "../../redux/api/collaborationApiSlice";
import { toast } from "react-toastify";
import { FaShare } from "react-icons/fa";

const ShareDialog = ({ entryId, isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [shareEntry, { isLoading }] = useShareEntryMutation();

  const handleShare = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email");
      return;
    }

    try {
      await shareEntry({
        entryId,
        email,
        canEdit,
      }).unwrap();

      toast.success(`Entry shared ${canEdit ? "with edit access" : "as read-only"}!`);
      setEmail("");
      setCanEdit(false);
      onClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to share entry");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-200 rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Share Entry</h2>

            <form onSubmit={handleShare}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full mb-4"
                required
              />

              <div className="form-control mb-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Allow them to edit this entry</span>
                  <input
                    type="checkbox"
                    checked={canEdit}
                    onChange={(e) => setCanEdit(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {canEdit ? "They can view and edit" : "They can only view and comment"}
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Sharing..." : "Share"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareDialog;
