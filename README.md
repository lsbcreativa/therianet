# TheriaNet

A minimal social network built with React. Share thoughts, howl at posts you like, and connect through a clean, dark-themed interface.

No backend needed — all data lives in your browser's localStorage.

---

## Tech Stack

- React 19 (Vite 7)
- React Router 7
- Context API
- localStorage for persistence
- Custom CSS (dark theme, amber/gold accents)

---

## Features

- Username-based login (no password, no signup friction)
- Create and delete posts with text and images
- **Howl** — a custom like system
- Image lightbox (click to expand, Escape to close)
- User profile with editable bio and avatar upload
- Profile stats (posts, howls received, member since)
- Feed tabs (All Posts / My Posts)
- Skeleton loaders for smooth loading states
- Toast notifications (success/error)
- Delete animation (slide-out)
- Data persists across page refreshes
- Dark theme UI with amber/gold accents
- Responsive design (sidebar on desktop, bottom nav on mobile)

---

## Getting Started

```bash
git clone https://github.com/lsbcreativa/therianet.git
cd therianet
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/     # Layout, PostCard, Toast, ProtectedRoute
├── context/        # Auth state (Context API)
├── pages/          # Login, Feed, Profile, NotFound
├── styles/         # CSS files (dark theme, skeleton, toast)
└── utils/          # localStorage helpers, image processing
```

---

## Screenshots

> Add your own screenshots here after running the project.

---

## Future Improvements

- Backend with Node.js + Express + MongoDB
- Real user authentication with JWT
- Follow/unfollow system
- Comments on posts
- Deployment to Vercel

---

## Author

**Andres Sanchez Botta** — [@lsbcreativa](https://github.com/lsbcreativa)
