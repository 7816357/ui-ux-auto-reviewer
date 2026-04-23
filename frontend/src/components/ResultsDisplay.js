import React from 'react';
import { motion } from 'framer-motion';
import './ResultsDisplay.css';

function ResultsDisplay({ results }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#9999';
      case 'medium':
        return '#582';
      case 'low':
        return '#9658';
      default:
        return '#888';
    }
  };

  return (
    <motion.div
      className="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* UX Score Section */}
      <motion.div
        className="score-card"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="score-meter">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" strokeWidth="8" />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#667eea"
              strokeWidth="8"
              strokeDasharray={`${(results.uxScore / 100) * 565.4} 565.4`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="score-value">
            <span className="score-number">{results.uxScore}</span>
            <span className="score-label">/100</span>
          </div>
        </div>
        <h2>UX Score</h2>
        <p className="score-feedback">
          {results.uxScore >= 80
            ? '✅ Excellent design quality'
            : results.uxScore >= 60
            ? '⚠️ Good design with some improvements needed'
            : '🔧 Design needs significant improvements'}
        </p>
      </motion.div>

      {/* Issues Section */}
      <motion.div
        className="issues-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3>Issues Found ({results.issues?.length || 0})</h3>
        <div className="issues-list">
          {results.issues && results.issues.length > 0 ? (
            results.issues.map((issue, index) => (
              <motion.div
                key={index}
                className="issue-item"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div
                  className="severity-indicator"
                  style={{ backgroundColor: getSeverityColor(issue.severity) }}
                ></div>
                <div className="issue-content">
                  <h4>{issue.title}</h4>
                  <p className="severity-label">{issue.severity} severity</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-issues">✅ No issues detected!</p>
          )}
        </div>
      </motion.div>

      {/* Suggestions Section */}
      <motion.div
        className="suggestions-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3>📋 Recommendations</h3>
        <ul className="suggestions-list">
          {results.suggestions && results.suggestions.length > 0 ? (
            results.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))
          ) : (
            <li>Your design looks great! Keep up the good work.</li>
          )}
        </ul>
      </motion.div>

      {/* Analysis Summary */}
      {results.analysis && (
        <motion.div
          className="analysis-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>📊 Analysis Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Issues</span>
              <span className="summary-value">{results.analysis.totalIssuesFound}</span>
            </div>
            <div className="summary-item high">
              <span className="summary-label">High Severity</span>
              <span className="summary-value">{results.analysis.highSeverity}</span>
            </div>
            <div className="summary-item medium">
              <span className="summary-label">Medium Severity</span>
              <span className="summary-value">{results.analysis.mediumSeverity}</span>
            </div>
            <div className="summary-item low">
              <span className="summary-label">Low Severity</span>
              <span className="summary-value">{results.analysis.lowSeverity}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ResultsDisplay;
