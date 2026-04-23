import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, error }) {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="login-page">
      <div className="background">
        <div className="rain" />
        <div className="lightning" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to analyze UI/UX designs with the Auto Reviewer.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          {error && <div className="login-error">⚠️ {error}</div>}

          <button className="login-button" type="submit">
            Sign In
          </button>
        </form>

        <div className="demo-note">
          Use <strong>user@example.com</strong> / <strong>password123</strong>
          for demo access.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
