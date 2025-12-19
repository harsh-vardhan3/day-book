# Real-Time Collaborative Journal Setup

## What's Been Implemented

### Backend
- ✅ Comment model for storing comments
- ✅ Entry model updated with `sharedWith` and `isPublic` fields
- ✅ Collaboration controller with share/unshare/comments logic
- ✅ Collaboration routes (/share, /unshare, /comments, etc)
- ✅ Socket.io server for real-time updates

### Frontend
- ✅ Collaboration API slice for Redux
- ✅ ShareDialog component to share entries
- ✅ Comments component with add/delete functionality
- ✅ Updated ReadMore modal with share button and comments
- ✅ EntryCard passing entry ID to modals

---

## Installation Steps

### Backend

**Install required packages:**
```bash
cd backend
npm install socket.io
```

### Frontend

**Install Socket.io client:**
```bash
cd frontend
npm install socket.io-client
```

---

## How It Works

### Sharing Entries
1. User opens entry (Read More button)
2. Clicks "Share Entry" button
3. Enters recipient's email
4. Backend finds user by email and adds to `sharedWith` array
5. Entry now visible to that user

### Viewing Shared Entries
- Add a new tab/page to show entries shared with you
- Users can see entries shared by others

### Real-Time Comments
1. User adds comment to any entry (owned or shared)
2. Comment saved to database
3. Socket.io broadcasts `comment-added` event to all clients
4. Other users see comment appear instantly
5. Only comment author can delete their comments

### Real-Time Notifications
- When entry is shared: `entry-shared-notification` event
- When comment is added: `comment-added` event
- When user goes online/offline: `user-status` event

---

## Socket.io Events

**Client can emit:**
- `user-online`: Tell server user is online
- `new-comment`: Send new comment to others
- `entry-shared`: Notify when entry is shared

**Server broadcasts:**
- `comment-added`: New comment created
- `entry-shared-notification`: Entry was shared with user
- `user-status`: User came online/offline

---

## API Endpoints

### Sharing
- `POST /api/collaboration/share` - Share entry with user
- `POST /api/collaboration/unshare` - Stop sharing entry
- `GET /api/collaboration/shared-with-me` - Get entries shared with me

### Comments
- `POST /api/collaboration/comment` - Add comment to entry
- `GET /api/collaboration/comments/:entryId` - Get comments for entry
- `DELETE /api/collaboration/comment/:commentId` - Delete comment

---

## TODO - Frontend Socket.io Integration

To complete real-time functionality, you'll need to:

1. Create a Socket.io context/hook:
```jsx
// src/context/SocketContext.jsx
import { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_API_URL || "http://localhost:3000");

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
```

2. Wrap your app with SocketProvider in main.jsx:
```jsx
import { SocketProvider } from "./context/SocketContext";

<SocketProvider>
  <App />
</SocketProvider>
```

3. Use socket in Comments component for real-time updates:
```jsx
const { socket } = useSocket();

useEffect(() => {
  socket.on("comment-added", (newComment) => {
    refetch(); // Refresh comments
  });

  return () => socket.off("comment-added");
}, []);
```

---

## Testing

1. Create two test accounts
2. User A writes an entry
3. User A shares entry with User B
4. User B sees it in "Shared With Me"
5. User B adds comment
6. Both see comment in real-time

---

## Next Steps

- Create "Shared Entries" page
- Add Socket.io notifications
- Create user search to find friends
- Add real-time typing indicator
- Add user presence (who's viewing this entry)

Let me know when packages are installed and I'll help with Socket.io client setup!
