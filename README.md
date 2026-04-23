# AI-Based UI/UX Auto Reviewer

A professional full-stack application for automatically evaluating UI designs and generating UX recommendations.

## Project Overview

This repository contains:

- `backend/` – Express API for image upload, UX analysis, and result management.
- `frontend/` – React app that provides login, drag-and-drop upload, and UX result visualization.

## Key Features

- Secure demo authentication flow
- Drag-and-drop image upload with file validation
- Rule-based UX analysis for accessibility, contrast, alignment, typography, and spacing
- UX score, issue summary, and recommendations
- Configured production-ready backend and frontend build flow
- GitHub Pages deployment workflow for frontend

## Architecture

- Frontend: React, Axios, Tailwind CSS, Framer Motion
- Backend: Express, Multer, CORS, dotenv
- Deployment: GitHub Actions deploys frontend to GitHub Pages

## Getting Started

### Install dependencies

From the repository root:

```bash
npm install-all
```

### Run in development mode

```bash
npm run dev
```

This starts:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### Build the frontend for production

```bash
npm run build
```

## Environment Configuration

Copy the example files and update values if needed:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Production Deployment

Build the frontend:

```bash
npm run build
```

Then serve the static frontend from the backend or deploy the frontend separately.

## Development Notes

- The backend can serve the React app from `frontend/build` in production mode.
- Use the demo credentials shown in the login screen for quick access.

## Folder Structure

- `backend/`
  - `controllers/`
  - `routes/`
  - `utils/`
  - `uploads/`
  - `server.js`
- `frontend/`
  - `public/`
  - `src/`
  - `components/`
  - `services/`

## Contact

For questions or improvements, update the repository documentation and code comments.
