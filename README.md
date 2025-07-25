# Music Player - Fullstack Monorepo

A fullstack music player application with a React + Vite + TypeScript frontend and three backend microservices: user-service, song-service, and admin-service.

## Project Structure

```
music-player/
│
├── admin-service/   # Admin backend (TypeScript, Express)
├── song-service/    # Song backend (TypeScript, Express)
├── user-service/    # User backend (TypeScript, Express, MongoDB)
├── frontend/        # React + Vite + TypeScript frontend
├── README.md
└── tracker.txt
```

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (for user-service)
- (Optional) Redis, Cloudinary, NeonDB for advanced features

## Setup Instructions

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd music-player
```

### 2. Environment Variables

Each service and the frontend require their own `.env` file. Example:

#### `frontend/.env`
```
VITE_USER_SERVICE_URL=http://localhost:5000
VITE_SONG_SERVICE_URL=http://localhost:7000
```

#### `user-service/.env`
```
MONGODB_URI=mongodb://localhost:27017/music-player
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### `song-service/.env` and `admin-service/.env`
```
PORT=7000
# Add other service-specific variables as needed
```

### 3. Install Dependencies

Install dependencies for each service and the frontend:

```sh
cd admin-service && npm install
cd ../song-service && npm install
cd ../user-service && npm install
cd ../frontend && npm install
```

### 4. Run the Services

In separate terminals, start each backend service:

```sh
# In admin-service/
npm run dev

# In song-service/
npm run dev

# In user-service/
npm run dev
```

### 5. Run the Frontend

In the `frontend/` directory:

```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Features

- User authentication and playlist management
- Song and album management (admin)
- Audio streaming and album browsing
- Responsive UI with React, TailwindCSS, and Vite

## Scripts

Each backend service and the frontend support:

- `npm run dev` — Start in development mode (with hot reload)
- `npm run build` — Build for production
- `npm start` — Start the built app

## License

MIT
