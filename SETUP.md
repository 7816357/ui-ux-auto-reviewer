# 🚀 Setup & Installation Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Configure environment variables (optional)
Edit `.env` file if needed:
```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 5. Start backend server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will run at: **http://localhost:5000**

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
cp .env.example .env
```

### 4. Configure environment variables (if backend is on different port)
Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Start development server
```bash
npm start
```

Frontend will run at: **http://localhost:3000**

## Running Both Services

### Option 1: Two Separate Terminals
- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm start`

### Option 2: Using Concurrently (Optional)
Install concurrently in root:
```bash
npm install -D concurrently
```

Update root package.json with:
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

Then run:
```bash
npm run dev
```

## Testing the Application

1. **Frontend**: Open http://localhost:3000 in your browser
2. **Upload a design**: Drag and drop an image (PNG, JPG, GIF, WebP)
3. **View results**: See UX score, issues, and recommendations
4. **Analyze another**: Click "Analyze Another Design"

## Troubleshooting

### Port Already in Use
```bash
# Change backend port in .env
PORT=5001

# Or kill process using port
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -i :5000
```

### CORS Errors
Ensure backend is running on correct port and `.env` is configured properly.

### File Upload Issues
- Check file size (max 50MB)
- Ensure file is a valid image format
- Check `backend/uploads/` folder permissions

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

### Backend for Production
```bash
cd backend
NODE_ENV=production npm start
```

## API Documentation

### POST /api/analyze
Upload a UI design for analysis

**Request:**
- Method: `POST`
- Endpoint: `/api/analyze`
- Content-Type: `multipart/form-data`
- Field: `design` (file)

**Response:**
```json
{
  "success": true,
  "resultId": "result-1234567890",
  "uxScore": 78,
  "issues": [
    {
      "title": "Low contrast text",
      "severity": "high",
      "component": "Color Contrast Check"
    }
  ],
  "suggestions": [
    "Improve color contrast ratios to meet WCAG AA standards"
  ]
}
```

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
