import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  useGetEntriesQuery,
  useSearchEntryQuery,
} from "../redux/api/entriesApiSlice";
import EntryCard from "../components/entry/EntryCard";
import AddEntry from "../components/entry/AddEntry";
import ExportEntries from "../components/entry/ExportEntries";
import Loader from "../components/Loader";
import { useState } from "react";

const Entries = () => {
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data: getEntries, isLoading: isLoadingEntries } = useGetEntriesQuery(
    undefined,
    { skip: searchQuery.length > 0 }
  );

  const { data: searchResult, isLoading: isLoadingSearch } =
    useSearchEntryQuery(searchQuery, {
      skip: searchQuery.length === 0,
    });

  if (isLoadingEntries || isLoadingSearch) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100dvh-64px-52px)]">
        <Loader />
      </div>
    );
  }

  const entries =
    searchQuery.length > 0 ? searchResult?.data || [] : getEntries?.data || [];

  // Filter favorites if toggle is on
  const displayedEntries = showFavoritesOnly
    ? entries.filter((entry) => entry.isFavorite)
    : entries;

  const favoriteCount = entries.filter((entry) => entry.isFavorite).length;

  if (entries.length === 0) {
    if (searchResult) {
      return (
        <div className="text-center mt-10 mx-7 min-h-[calc(100dvh-64px-52px-40px)]">
          <p className="text-2xl font-semibold mb-2">
            Sorry {user.data.firstName}, I couldn't find any entries matching
            your search query!
          </p>
          <p className="text-lg">
            It looks like there are no entries that match your search criteria.
            Try searching with different keywords!
          </p>
          <div className="fixed bottom-20 z-10 left-[calc(100vw-7rem)]">
            <AddEntry />
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center mt-10 mx-7 min-h-[calc(100dvh-64px-52px-40px)]">
          <p className="text-2xl font-semibold mb-2">
            Welcome, {user.data.firstName}
          </p>
          <p className="text-lg mb-2">
            It looks like you haven't added any entries yet.
          </p>
          <p className="text-lg">
            Start your journey by creating your very first entry by clicking the
            bottom '+' button!
          </p>
          <div className="fixed bottom-20 z-10 left-[calc(100vw-7rem)]">
            <AddEntry />
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="fixed bottom-20 z-10 left-[calc(100vw-7rem)]">
        <AddEntry />
      </div>

      <div className="flex justify-center items-center gap-4 my-6">
        {/* Filter Toggle */}
        {!searchQuery && favoriteCount > 0 && (
          <div className="btn-group">
            <button
              className={`btn btn-sm ${!showFavoritesOnly ? "btn-active" : ""}`}
              onClick={() => setShowFavoritesOnly(false)}
            >
              All Entries ({entries.length})
            </button>
            <button
              className={`btn btn-sm ${showFavoritesOnly ? "btn-active" : ""}`}
              onClick={() => setShowFavoritesOnly(true)}
            >
              ⭐ Favorites ({favoriteCount})
            </button>
          </div>
        )}
        
        {/* Export Button */}
        {!searchQuery && entries.length > 0 && (
          <ExportEntries />
        )}
      </div>

      {displayedEntries.length === 0 && showFavoritesOnly ? (
        <div className="text-center mt-20 mx-7">
          <p className="text-2xl font-semibold mb-2">No favorite entries yet</p>
          <p className="text-lg">
            Click the star icon on any entry to add it to your favorites!
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center my-10 min-h-[calc(100dvh-64px-52px-80px)] mx-7">
          {displayedEntries.map((entry) => (
            <EntryCard
              key={entry._id}
              id={entry._id}
              date={entry.date}
              title={entry.title}
              mood={entry.mood}
              content={entry.content}
              updatedAt={entry.updatedAt}
              highlightText={searchQuery}
              createdBy={entry.createdBy}
              canEdit={entry.canEdit}
              isFavorite={entry.isFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Entries;
