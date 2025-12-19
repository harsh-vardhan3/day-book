import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBookOpen, FaChartBar, FaCalendarAlt, FaUserFriends, FaStar, FaFire } from "react-icons/fa";
import logo from "../assets/logo.svg";

const Home = () => {
  const user = useSelector((state) => state.user);

  const features = [
    {
      icon: <FaBookOpen className="text-4xl text-primary" />,
      title: "Smart Journaling",
      description: "AI-powered mood detection automatically analyzes your entries and tracks emotional patterns over time."
    },
    {
      icon: <FaChartBar className="text-4xl text-secondary" />,
      title: "Mood Analytics",
      description: "Visualize your emotional journey with interactive charts and insights into your mental well-being."
    },
    {
      icon: <FaUserFriends className="text-4xl text-accent" />,
      title: "Collaborate & Share",
      description: "Share entries with trusted friends, add comments, and collaborate on memories together."
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-info" />,
      title: "Calendar View",
      description: "Visual calendar shows your journaling patterns at a glance. Never miss tracking your thoughts."
    },
    {
      icon: <FaStar className="text-4xl text-warning" />,
      title: "Favorite Entries",
      description: "Mark important memories as favorites and filter them easily for quick access anytime."
    },
    {
      icon: <FaFire className="text-4xl text-error" />,
      title: "Writing Streaks",
      description: "Build consistency with daily writing streaks. Track your longest streak and stay motivated!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-[calc(100vh-64px-40px)] bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            {user ? (
              <>
                <div className="text-6xl mb-6">👋</div>
                <h1 className="text-5xl xl:text-7xl font-bold mb-6">
                  Welcome Back,{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {user.data.firstName}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Your personal sanctuary for thoughts and memories. Continue your journey of self-discovery and growth.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/entries" className="btn btn-primary btn-lg">
                    📖 My Entries
                  </Link>
                  <Link to="/analytics" className="btn btn-outline btn-lg">
                    📊 View Analytics
                  </Link>
                </div>
                {/* Stats */}
                {user.data.currentStreak > 0 && (
                  <div className="stats shadow-lg mt-10">
                    <div className="stat">
                      <div className="stat-figure text-3xl">🔥</div>
                      <div className="stat-title">Current Streak</div>
                      <div className="stat-value text-primary">{user.data.currentStreak}</div>
                      <div className="stat-desc">days in a row</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure text-3xl">🏆</div>
                      <div className="stat-title">Best Streak</div>
                      <div className="stat-value text-secondary">{user.data.longestStreak}</div>
                      <div className="stat-desc">your record</div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-8">
                  <img src={logo} alt="DayBook Logo" className="w-32 h-32 mx-auto" />
                </div>
                <h1 className="text-5xl xl:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    DayBook
                  </span>
                </h1>
                <p className="text-2xl font-semibold mb-4">
                  Your AI-Powered Personal Journal
                </p>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Track your thoughts, analyze your moods, and collaborate with others. 
                  A modern journaling experience designed for mindful living.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    🚀 Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    🔐 Log In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need for meaningful journaling</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-20 bg-gradient-to-br from-primary to-secondary">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your Journaling Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who trust DayBook with their thoughts and memories
            </p>
            <Link to="/signup" className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-none">
              Create Free Account →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
