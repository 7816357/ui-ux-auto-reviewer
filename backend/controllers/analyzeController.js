const fs = require('fs');
const path = require('path');
const uxAnalyzer = require('../utils/uxAnalyzer');

// In-memory store for results (in production, use a database)
const resultsStore = {};

exports.analyzeDesign = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileName = req.file.filename;
    const resultId = `result-${Date.now()}`;

    // Perform UX analysis
    const analysisResult = await uxAnalyzer.analyzeUI(filePath);

    // Store results
    resultsStore[resultId] = {
      id: resultId,
      fileName: fileName,
      uploadTime: new Date(),
      filePath: filePath,
      ...analysisResult
    };

    // Send response
    res.json({
      success: true,
      resultId: resultId,
      uxScore: analysisResult.uxScore,
      issues: analysisResult.issues,
      suggestions: analysisResult.suggestions
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Error analyzing design', details: error.message });
  }
};

exports.getResults = (req, res) => {
  try {
    const { id } = req.params;
    
    if (!resultsStore[id]) {
      return res.status(404).json({ error: 'Results not found' });
    }

    const result = resultsStore[id];
    res.json({
      success: true,
      data: {
        id: result.id,
        fileName: result.fileName,
        uploadTime: result.uploadTime,
        uxScore: result.uxScore,
        issues: result.issues,
        suggestions: result.suggestions,
        analysis: result.analysis
      }
    });

  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Error fetching results' });
  }
};
