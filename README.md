# 📖 DayBook

A modern, AI-powered journaling application that helps you track your thoughts, emotions, and memories. Built with the MERN stack, featuring automatic mood detection, writing streaks, collaboration tools, and insightful analytics.

**Live Demo:** [https://day-book-swart.vercel.app](https://day-book-swart.vercel.app)

---

## ✨ Features

### 🧠 Smart Journaling
- **AI-Powered Mood Detection**: Automatic sentiment analysis detects your emotional state from entry content
- **Writing Streaks**: Build consistency with daily streak tracking and motivational stats
- **Favorites**: Mark important memories and filter them easily
- **Word Count & Reading Time**: Automatic calculation for each entry

### 📊 Analytics & Insights
- **Mood Analytics**: Visualize emotional patterns over time with interactive charts
- **Calendar View**: Monthly grid showing all entries with mood indicators
- **Sentiment Tracking**: Track emotional intensity and comparative scores

### 🤝 Collaboration
- **Share Entries**: Share journal entries with friends or family
- **Real-time Comments**: Add comments to shared entries with live updates
- **Permission Control**: Grant view or edit access to collaborators
- **Live Collaboration**: Socket.io powered real-time updates

### 🎨 User Experience
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Themes**: Multiple theme options with DaisyUI
- **Search Functionality**: Quick search across all entries
- **Export Options**: Download entries in JSON, Text, or Markdown formats

### 🔒 Security
- **JWT Authentication**: Secure HTTP-only cookie-based auth
- **Password Encryption**: bcrypt password hashing
- **Protected Routes**: Role-based access control
- **CORS Protection**: Configured for production security

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.0.0
- **State Management**: Redux Toolkit 2.6.1 with RTK Query
- **Routing**: React Router 7.2.0
- **Styling**: TailwindCSS 4.0.9 + DaisyUI 5.0.0
- **Charts**: Recharts for analytics visualization
- **Icons**: React Icons 5.5.0
- **Notifications**: React-Toastify 11.0.5
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js 4.21.1
- **Database**: MongoDB with Mongoose 8.8.3
- **Authentication**: JWT 9.0.2 with bcryptjs
- **Real-time**: Socket.io 4.8.1
- **AI/ML**: Sentiment analysis (sentiment 5.0.2)
- **Validation**: Validator.js

---

## 📁 Project Structure

```
daybook/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js        # Authentication logic
│   │   │   ├── userController.js        # User profile operations
│   │   │   ├── entryController.js       # CRUD + sentiment analysis
│   │   │   └── collaborationController.js # Sharing & comments
│   │   ├── middleware/
│   │   │   └── authMiddleware.js        # JWT verification
│   │   ├── models/
│   │   │   ├── userModel.js             # User schema (with streaks)
│   │   │   ├── entryModel.js            # Entry schema (with sentiment)
│   │   │   └── commentModel.js          # Comment schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── entryRoutes.js
│   │   │   └── collaborationRoutes.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── sentimentAnalyzer.js     # AI mood detection
│   │   └── index.js                     # Server entry + Socket.io
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── entry/
│   │   │   │   ├── AddEntry.jsx
│   │   │   │   ├── EditEntry.jsx
│   │   │   │   ├── DeleteEntry.jsx
│   │   │   │   ├── EntryCard.jsx
│   │   │   │   ├── ReadMore.jsx
│   │   │   │   ├── CalendarView.jsx     # Monthly calendar
│   │   │   │   ├── ExportEntries.jsx    # Export functionality
│   │   │   │   ├── MoodAnalytics.jsx    # Charts & graphs
│   │   │   │   ├── ShareDialog.jsx      # Sharing UI
│   │   │   │   └── Comments.jsx         # Comment section
│   │   │   ├── auth/
│   │   │   │   ├── Profile.jsx          # With streak stats
│   │   │   │   ├── Password.jsx
│   │   │   │   └── Logout.jsx
│   │   │   ├── navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── NavLinks.jsx
│   │   │   │   ├── NavProfile.jsx
│   │   │   │   └── SearchBox.jsx
│   │   │   ├── StreakDisplay.jsx        # Writing streak counter
│   │   │   ├── ThemeController.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Landing page
│   │   │   ├── Entries.jsx              # All entries + filters
│   │   │   ├── SharedEntries.jsx        # Collaborative entries
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── api/
│   │   │   │   ├── apiSlice.js
│   │   │   │   ├── entriesApiSlice.js
│   │   │   │   ├── usersApiSlice.js
│   │   │   │   └── collaborationApiSlice.js
│   │   │   └── features/
│   │   │       └── userSlice.js
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
│
├── COLLAB_SETUP.md                      # Collaboration feature docs
├── SENTIMENT_SETUP.md                   # Sentiment analysis docs
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/harsh-vardhan3/day-book.git
cd day-book/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🌐 Deployment

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=<your_mongodb_atlas_uri>`
   - `JWT_SECRET=<random_secure_string>`
   - `FRONTEND_URL=<your_vercel_url>`

### Frontend (Vercel)
1. Import project on [Vercel](https://vercel.com)
2. Configure:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
3. Add environment variable:
   - `VITE_API_URL=<your_render_backend_url>`
4. Deploy

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `PATCH /api/auth/password` - Update password

### Entries
- `GET /api/entries` - Get all user entries
- `POST /api/entries` - Create new entry (with sentiment analysis)
- `GET /api/entries/:id` - Get single entry
- `PATCH /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry
- `GET /api/entries/search?q=query` - Search entries
- `PATCH /api/entries/:id/favorite` - Toggle favorite status

### User
- `GET /api/users/profile` - Get user profile (with streak stats)
- `PATCH /api/users/profile` - Update profile

### Collaboration
- `POST /api/collaboration/share/:entryId` - Share entry
- `GET /api/collaboration/shared` - Get shared entries
- `POST /api/collaboration/comments/:entryId` - Add comment
- `GET /api/collaboration/comments/:entryId` - Get comments

---

## 🎯 Key Features Implementation

### Sentiment Analysis
Automatic mood detection using natural language processing:
- Analyzes entry title + content
- Assigns mood emoji (😄 🙂 😐 😔 😢)
- Calculates sentiment score, intensity, and comparative metrics
- Stored in database for analytics

### Writing Streaks
Gamified consistency tracking:
- Increments on consecutive days
- Resets on missed days
- Tracks longest streak
- Displayed in navbar and profile

### Real-time Collaboration
Socket.io powered features:
- Live comment notifications
- User online status
- Entry sharing events
- Instant UI updates

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Developer

Built with ❤️ as a portfolio project showcasing modern web development practices.

---

## 📧 Contact

For any queries or suggestions, feel free to reach out or open an issue on GitHub.

The app should now be running locally. `By default`:

- The frontend runs on [http://localhost:5173](http://localhost:5173)
- The backend runs on [http://localhost:3000](http://localhost:3000)

---

## 5. API Endpoints

| **Method** | **Endpoint**                | **Description**                                                                                                                                                                                          |
| :--------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST       | `/api/auth/signup`          | Registers a new user by saving their email and hashed password to the MongoDB database. After that a JWT token is returned and stored in an HTTP-only secured cookie, automatically logging the user in. |
| POST       | `/api/auth/login`           | Authenticates the user with their provided credentials (email and password). If successful, a JWT token is returned and stored in an HTTP-only secured cookie, providing access to protected resources.  |
| POST       | `/api/auth/logout`          | Logs out the user by setting the JWT token stored in the HTTP-only cookie as null and setting its expiration now, effectively invalidating the user's token cookie.                                      |
| GET        | `/api/users/me`             | Retrieves the current user's information (email, first name, last name) based on the authenticated session. This request requires the user to be logged in.                                              |
| PUT        | `/api/users/me`             | Allows the logged-in user to update their personal details, such as first name, last name, while keeping the rest of their account intact.                                                               |
| PUT        | `/api/auth/change-password` | Enables the user to change their password. The request requires both the old password (for verification) and the new password, updating the password in the database after successful verification.      |
| POST       | `/api/entries`              | Adds a new entry to the database. The request body must include the necessary details for the entry (date, title, mood, content). Only authenticated users can add entries.                              |
| GET        | `/api/entries`              | Retrieves all entries stored in the database. This is typically used by the user to view a list of all their entries. Requires the user to be authenticated.                                             |
| GET        | `/api/entries/:id`          | Retrieves a specific entry based on its unique ID. The ID should be passed as a parameter in the URL, and only the entry corresponding to that ID will be returned.                                      |
| PATCH      | `/api/entries/:id`          | Updates an existing entry specified by its ID. The request body must include the fields that need to be updated (date, title, mood, content). Only the owner of the entry can modify and see it.         |
| DELETE     | `/api/entries/:id`          | Deletes the entry specified by its ID. Only the user who created the entry is authorized to delete or see it. The entry will be permanently removed from the database.                                   |
| GET        | `/api/entries/search?text=` | Searches for entries that match the given search text in either the title or the description. The search query parameter text should contain the keyword(s) you want to search for.                      |

---

## 6. Contributing

Contributions are welcome! If you'd like to improve DayBook, please follow these steps:

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/YourFeature
   ```

5. Open a pull request detailing your changes.
