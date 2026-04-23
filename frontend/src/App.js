import React, { useState } from 'react';
import './App.css';
import UploadArea from './components/UploadArea';
import ResultsDisplay from './components/ResultsDisplay';
import LoginPage from './components/LoginPage';
import api from './services/api';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async ({ email, password }) => {
    setAuthError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Unable to sign in.');
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setResults(null);
    setError(null);
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('design', file);

      const response = await api.post('/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error analyzing design');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} error={authError} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-top">
          <div>
            <h1>🧠 AI-Based UI/UX Auto Reviewer</h1>
            <p>Automated analysis of your UI designs</p>
          </div>
          <div className="user-panel">
            <span>{user?.name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {!results ? (
          <UploadArea onFileUpload={handleFileUpload} loading={loading} error={error} />
        ) : (
          <>
            <ResultsDisplay results={results} />
            <button 
              className="reset-button"
              onClick={() => setResults(null)}
            >
              ← Analyze Another Design
            </button>
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 AI-Based UI/UX Auto Reviewer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
