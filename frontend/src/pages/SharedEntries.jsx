import { useGetSharedWithMeQuery } from "../redux/api/collaborationApiSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import EntryCard from "../components/entry/EntryCard";

const SharedEntries = () => {
  const user = useSelector((state) => state.user);
  const { data, isLoading, error } = useGetSharedWithMeQuery(undefined, {
    skip: !user,
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching shared entries:", error);
  }

  const sharedEntries = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shared With Me</h1>

      {sharedEntries.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">No shared entries yet</p>
          <p className="text-sm text-gray-500 mt-2">
            When someone shares an entry with you, it will appear here
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center my-10">
          {sharedEntries.map((entry) => (
            <div key={entry._id} className="relative">
              <div className="absolute top-10 left-2 z-10 badge badge-info badge-xs">
                By: {entry.createdBy?.firstName} {entry.createdBy?.lastName}
              </div>
              {entry.canEdit && entry.canEdit.includes(user.data._id) && (
                <div className="absolute top-10 right-2 z-10 badge badge-success badge-xs">
                  Can Edit
                </div>
              )}
              <EntryCard
                id={entry._id}
                date={entry.date}
                title={entry.title}
                mood={entry.mood}
                content={entry.content}
                updatedAt={entry.updatedAt}
                createdBy={entry.createdBy}
                canEdit={entry.canEdit}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedEntries;
