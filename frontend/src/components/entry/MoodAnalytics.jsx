import { useState, useEffect } from "react";
import { useGetEntriesQuery } from "../../redux/api/entriesApiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Loader from "../Loader";

const MoodAnalytics = () => {
  const { data, isLoading } = useGetEntriesQuery();
  const [moodStats, setMoodStats] = useState([]);
  const [sentimentTrend, setSentimentTrend] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const entries = data.data;

      // Calculate mood distribution
      const moodCount = {
        "😄": 0,
        "🙂": 0,
        "😐": 0,
        "😔": 0,
        "😢": 0,
      };

      let totalScore = 0;
      const monthlyTrend = {};

      entries.forEach((entry) => {
        if (entry.mood) {
          moodCount[entry.mood]++;
        }

        if (entry.sentiment?.score) {
          totalScore += entry.sentiment.score;
        }

        // Create monthly trend
        const date = new Date(entry.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        if (!monthlyTrend[monthKey]) {
          monthlyTrend[monthKey] = { month: monthKey, avgScore: 0, count: 0 };
        }
        monthlyTrend[monthKey].avgScore += entry.sentiment?.score || 0;
        monthlyTrend[monthKey].count++;
      });

      // Calculate averages for monthly trend
      const trendData = Object.values(monthlyTrend).map((item) => ({
        month: item.month,
        avgScore: parseFloat((item.avgScore / item.count).toFixed(2)),
      }));

      const statsData = Object.entries(moodCount).map(([mood, count]) => ({
        name: mood,
        count,
        percentage: ((count / entries.length) * 100).toFixed(1),
      }));

      setMoodStats(statsData);
      setSentimentTrend(trendData);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const colors = {
    "😄": "#10B981",
    "🙂": "#3B82F6",
    "😐": "#F59E0B",
    "😔": "#F97316",
    "😢": "#EF4444",
  };

  const COLORS = Object.values(colors);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Mood Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Mood Distribution Pie Chart */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Mood Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Stats Table */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Mood Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>Mood</th>
                  <th>Count</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {moodStats.map((stat) => (
                  <tr key={stat.name}>
                    <td className="text-2xl">{stat.name}</td>
                    <td className="font-semibold">{stat.count}</td>
                    <td>{stat.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sentiment Trend */}
      {sentimentTrend.length > 0 && (
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Sentiment Trend Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3B82F6" name="Avg Sentiment Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="card bg-success bg-opacity-20 shadow p-4">
          <p className="text-sm opacity-70">Total Entries</p>
          <p className="text-3xl font-bold">{moodStats.reduce((a, b) => a + b.count, 0)}</p>
        </div>
        <div className="card bg-primary bg-opacity-20 shadow p-4">
          <p className="text-sm opacity-70">Most Common Mood</p>
          <p className="text-2xl">
            {moodStats.length > 0 && moodStats.reduce((a, b) => (a.count > b.count ? a : b)).name}
          </p>
        </div>
        <div className="card bg-warning bg-opacity-20 shadow p-4">
          <p className="text-sm opacity-70">Overall Positivity</p>
          <p className="text-3xl font-bold">
            {moodStats
              .filter((s) => s.name === "😄" || s.name === "🙂")
              .reduce((a, b) => a + parseFloat(b.percentage), 0)
              .toFixed(1)}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics;
