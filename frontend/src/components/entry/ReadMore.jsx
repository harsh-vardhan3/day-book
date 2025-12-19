import { useState } from "react";
import ModalLayout from "../ModalLayout";
import ShareDialog from "./ShareDialog";
import Comments from "./Comments";
import { FaShare } from "react-icons/fa";

const ReadMore = ({
  formattedDate,
  title,
  mood,
  content,
  formattedUpdateAt,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm btn-outline btn-primary"
        onClick={() => setOpen(true)}
      >
        Read More
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div>
          <div className="block text-center card-title pb-2">
            <span>{mood} </span>
            <span>{title} </span>
            <span>{mood} </span>
          </div>

          <div className="text-left text-sm p-2 pb-1">
            Date: {formattedDate}
          </div>

          <div className="card-body p-2 pb-0">
            <p className="break-words">{content}</p>
          </div>

          <div className="text-right text-sm p-2 pb-0">
            Last edit: {formattedUpdateAt}
          </div>

          <div className="flex gap-2 justify-center pt-4 pb-2">
            <button
              className="btn btn-sm btn-outline btn-info"
              onClick={() => setShareOpen(true)}
            >
              <FaShare /> Share Entry
            </button>
          </div>

          <Comments entryId={id} />

          <ShareDialog
            entryId={id}
            isOpen={shareOpen}
            onClose={() => setShareOpen(false)}
          />
        </div>
      </ModalLayout>
    </>
  );
};
export default ReadMore;
