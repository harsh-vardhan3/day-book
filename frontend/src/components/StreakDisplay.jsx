import { useSelector } from "react-redux";

const StreakDisplay = () => {
  const user = useSelector((state) => state.user);

  const currentStreak = user?.data?.currentStreak || 0;
  const longestStreak = user?.data?.longestStreak || 0;

  return (
    <div className="flex items-center gap-4">
      <div className="tooltip" data-tip={`Longest: ${longestStreak} days`}>
        <div className="flex items-center gap-2 bg-base-300 px-3 py-1.5 rounded-lg">
          <span className="text-2xl">🔥</span>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Streak</span>
            <span className="text-sm font-bold">{currentStreak} days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
