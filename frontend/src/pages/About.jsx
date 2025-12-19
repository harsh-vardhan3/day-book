import { FaBookOpen, FaChartBar, FaUserFriends, FaCalendarAlt, FaStar, FaFire, FaLock, FaPalette } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaBookOpen className="text-4xl text-primary" />,
      title: "Write & Manage Entries",
      description: "Effortlessly create, edit, and delete journal entries while keeping them safe and organized."
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-info" />,
      title: "Track Your Memories",
      description: "Capture experiences from any date with calendar view, ensuring your journey is well-documented."
    },
    {
      icon: <FaChartBar className="text-4xl text-secondary" />,
      title: "Automatic Mood Detection",
      description: "AI-powered sentiment analysis tracks your mood and provides emotional pattern analytics."
    },
    {
      icon: <FaUserFriends className="text-4xl text-accent" />,
      title: "Share & Collaborate",
      description: "Share entries with friends, add comments, and grant edit permissions for collaborative journaling."
    },
    {
      icon: <FaStar className="text-4xl text-warning" />,
      title: "Favorites & Streaks",
      description: "Mark important memories as favorites and build writing streaks to stay motivated."
    },
    {
      icon: <FaLock className="text-4xl text-error" />,
      title: "Advanced Security",
      description: "Protect your entries with JWT authentication, encrypted passwords, and secure HTTP cookies."
    }
  ];

  const techStack = [
    { category: "Frontend", tech: "React 19, Redux Toolkit, TailwindCSS, DaisyUI, Recharts" },
    { category: "Backend", tech: "Node.js, Express.js, Socket.io" },
    { category: "Database", tech: "MongoDB with Mongoose ODM" },
    { category: "Authentication", tech: "JWT with secure HTTP-only cookies" },
    { category: "AI/ML", tech: "Sentiment analysis for mood detection" },
    { category: "Real-time", tech: "Socket.io for live collaboration" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About DayBook
            </span>
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            A secure and trusted digital journal that protects your thoughts and memories. 
            Built for simplicity and reliability, DayBook prioritizes privacy and a 
            distraction-free experience, ensuring your journaling stays personal, secure, and meaningful.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="card-title text-lg mb-2">{feature.title}</h3>
                  <p className="text-base-content/70 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="card bg-base-100 shadow-xl mb-16">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tech Stack
              </span>
            </h2>
            <p className="text-center text-base-content/70 mb-8">
              Built with modern technologies to ensure a secure and efficient journaling experience
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {techStack.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                  <div className="badge badge-primary badge-lg">{item.category}</div>
                  <p className="text-base-content/80 flex-1">{item.tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card bg-gradient-to-br from-primary to-secondary shadow-xl">
          <div className="card-body items-center text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
            <p className="text-lg mb-6 max-w-2xl">
              Join DayBook where your memories are secure, personal, and always accessible. 
              Begin documenting your life's moments with the power of AI-driven insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
