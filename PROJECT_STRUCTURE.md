# Project Structure

```
bca project/
├── README.md                          # Project documentation
├── .gitignore                         # Git ignore rules
│
├── frontend/                          # React.js Frontend
│   ├── public/
│   │   └── index.html                # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadArea.js         # File upload component
│   │   │   ├── UploadArea.css        # Upload area styles
│   │   │   ├── ResultsDisplay.js     # Results display component
│   │   │   └── ResultsDisplay.css    # Results display styles
│   │   ├── services/
│   │   │   └── api.js                # API client configuration
│   │   ├── App.js                    # Main App component
│   │   ├── App.css                   # App styles
│   │   ├── index.js                  # React entry point
│   │   ├── index.css                 # Global styles
│   │   └── tailwind.css              # Tailwind CSS imports
│   ├── package.json                  # Frontend dependencies
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── .env.example                  # Environment variables example
│
└── backend/                           # Node.js + Express Backend
    ├── routes/
    │   └── analyze.js                # API routes for analysis
    ├── controllers/
    │   └── analyzeController.js      # Controller logic
    ├── middleware/                   # Custom middleware (expandable)
    ├── utils/
    │   └── uxAnalyzer.js             # UX analysis engine (rule-based)
    ├── uploads/                      # Temporary file storage
    ├── server.js                     # Express server configuration
    ├── package.json                  # Backend dependencies
    └── .env.example                  # Environment variables example
```

## Component Descriptions

### Frontend Components

**UploadArea.js**
- Drag-and-drop UI upload interface
- File browser fallback
- Loading state with spinner
- Error message display

**ResultsDisplay.js**
- Animated UX score meter (0-100)
- Issues list with severity indicators
- Recommendations/suggestions
- Analysis summary statistics

**App.js**
- Main application wrapper
- State management for results
- Navigation between upload and results

### Backend Components

**server.js**
- Express application setup
- CORS configuration
- Global error handling
- Server startup

**analyze.js** (Routes)
- POST `/api/analyze` - Upload and analyze design
- GET `/api/results/:id` - Fetch stored results
- Multer configuration for file uploads

**analyzeController.js**
- File upload handling
- Analysis orchestration
- Response formatting

**uxAnalyzer.js** (Analysis Engine)
- Rule-based UX evaluation
- Spacing detection
- Color contrast checking
- Alignment validation
- Typography analysis
- Accessibility evaluation
- UX score calculation (0-100)
- Suggestion generation
