# 🚀 Setup & Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- npm package manager
- Git

## Root Installation

From the repository root, install backend and frontend dependencies:

```bash
npm install-all
```

## Development Mode

Start both backend and frontend together from the repository root:

```bash
npm run dev
```

This starts:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Backend Setup

### 1. Copy environment file
```bash
cp backend/.env.example backend/.env
```

### 2. Start backend only
```bash
cd backend
npm run dev
```

## Frontend Setup

### 1. Copy environment file
```bash
cp frontend/.env.example frontend/.env
```

### 2. Start frontend only
```bash
cd frontend
npm start
```

## Production Build

Build the frontend for production:

```bash
npm run build
```

Then start the backend in production mode:

```bash
cd backend
NODE_ENV=production npm start
```

The backend is configured to serve the frontend build when `NODE_ENV=production`.

## Running Services Separately

### Backend only
```bash
cd backend
npm run dev
```

### Frontend only
```bash
cd frontend
npm start
```

## Troubleshooting

### Port already in use
- Change `PORT` in `backend/.env`
- On Windows: `netstat -ano | findstr :5000`

### CORS errors
- Verify backend is running
- Confirm `REACT_APP_API_URL` in `frontend/.env`

### Upload issues
- Validate image format
- Check file size (max 50MB)
- Ensure `backend/uploads/` is writable

## Project Deployment

The repository includes a GitHub Actions workflow for deploying the frontend to GitHub Pages.

## API Overview

### POST /api/analyze
Upload a UI design for analysis.

- `Content-Type`: `multipart/form-data`
- Field: `design`

### GET /api/results/:id
Fetch analysis results by ID.

## Notes

- For local development, the frontend can proxy API requests to the backend.
- In production, the backend serves the frontend build.

### GET /api/results/:id
Retrieve stored analysis results

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "result-1234567890",
    "fileName": "design.png",
    "uploadTime": "2024-01-15T10:30:00Z",
    "uxScore": 78,
    "issues": [...],
    "suggestions": [...],
    "analysis": {
      "totalIssuesFound": 3,
      "highSeverity": 1,
      "mediumSeverity": 1,
      "lowSeverity": 1
    }
  }
}
```

## Next Steps

1. **Test the application** with sample UI designs
2. **Integrate advanced AI models** (Computer Vision, ML)
3. **Connect to a database** (MongoDB, PostgreSQL)
4. **Deploy** to cloud platform (Heroku, AWS, Vercel, etc.)
5. **Add authentication** and user management
6. **Implement export reports** functionality
