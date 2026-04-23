const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const analyzeController = require('../controllers/analyzeController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST route for analyzing UI designs
router.post('/analyze', upload.single('design'), analyzeController.analyzeDesign);

// GET route to fetch analysis results
router.get('/results/:id', analyzeController.getResults);

module.exports = router;
