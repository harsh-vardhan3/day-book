import ReadMore from "./ReadMore";
import EditEntry from "./EditEntry";
import DeleteEntry from "./DeleteEntry";
import { useSelector } from "react-redux";
import { useToggleFavoriteMutation } from "../../redux/api/entriesApiSlice";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";

const EntryCard = ({
  id,
  date,
  title,
  mood,
  content,
  updatedAt,
  highlightText,
  createdBy,
  canEdit,
  isFavorite,
  showActions = true,
}) => {
  const user = useSelector((state) => state.user);
  const [toggleFavorite] = useToggleFavoriteMutation();
  console.log('User state:', user);
  
  // Try multiple paths to get user ID
  const userId = user?.data?._id || user?.user?._id || user?._id;
  console.log('Extracted userId:', userId);
  
  // Check ownership - if createdBy is not provided, assume it's the user's own entry
  const isOwner = createdBy ? (userId && createdBy._id === userId) : true;
  const hasEditPermission = canEdit && userId && canEdit.includes(userId);
  const canEditEntry = isOwner || hasEditPermission;
  const canDeleteEntry = isOwner; // Only owner can delete

  // Debug logging
  if (canEdit || createdBy) {
    console.log('EntryCard permissions:', {
      userId,
      createdById: createdBy?._id,
      canEditArray: canEdit,
      isOwner,
      hasEditPermission,
      canEditEntry
    });
  }
  const formattedDate = new Date(date).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedUpdateAt = new Date(updatedAt).toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const contentLimit =
    content.length > 300 ? `${content.slice(0, 300)}...` : content;

  // Word count and reading time calculation
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min

  const highlightMatch = (text) => {
    if (!highlightText) return text;
    const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={index} className="text-secondary">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(id).unwrap();
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      toast.error("Failed to update favorite");
    }
  };

  return (
    <div className="card bg-base-200 w-100 h-70 shadow-xl hover:shadow-2xl rounded-3xl">
      <div className="flex justify-between items-center pt-4 px-3">
        <p className="text-sm">{formattedDate}</p>
        {showActions && (
          <div className="flex gap-2 items-center">
            {isOwner && (
              <button
                onClick={handleToggleFavorite}
                className="text-warning hover:scale-110 transition-transform"
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? <FaStar size={18} /> : <FaRegStar size={18} />}
              </button>
            )}
            {canEditEntry && <EditEntry id={id} />}
            {canDeleteEntry && <DeleteEntry id={id} />}
          </div>
        )}
      </div>

      <div className="card-body p-4">
        <h2 className="card-title block">
          {mood} {highlightMatch(title)}
        </h2>
        <p className="break-words">{highlightMatch(contentLimit)}</p>
        <div className="text-xs text-gray-500 mt-2">
          {wordCount} words • {readingTime} min read
        </div>
      </div>

      <div className="flex justify-between items-center pb-4 px-3">
        <div className="text-left text-sm">Edited: {formattedUpdateAt}</div>
        <div className="text-left text-sm">
          <ReadMore
            id={id}
            formattedDate={formattedDate}
            title={title}
            mood={mood}
            content={content}
            formattedUpdateAt={formattedUpdateAt}
          />
        </div>
      </div>
    </div>
  );
};
export default EntryCard;
