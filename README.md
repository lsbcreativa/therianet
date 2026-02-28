# TheriaNet

A minimal social network built with React. Share thoughts, howl at posts you like, and connect through a clean, dark-themed interface.

No backend needed — all data lives in your browser's localStorage.

---

## Tech Stack

- React 19 (Vite)
- React Router
- Context API
- localStorage for persistence
- Custom CSS (dark theme)

---

## Features

- Username-based login (no password, no signup friction)
- Create and delete text posts
- **Howl** — a custom like system
- User profile with editable bio
- Data persists across page refreshes
- Dark theme UI with blue/violet accents
- Responsive design

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
├── components/     # Navbar, PostCard, ProtectedRoute
├── context/        # Auth state (Context API)
├── pages/          # Login, Feed, Profile, NotFound
├── styles/         # CSS files (dark theme)
└── utils/          # localStorage helpers
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
- Image avatars
- Deployment to Vercel

---

## Author

**Andres Sanchez Botta** — [@lsbcreativa](https://github.com/lsbcreativa)
