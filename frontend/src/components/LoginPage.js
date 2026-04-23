import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, error }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'user@example.com',
    password: 'password123'
  });
  const [registerError, setRegisterError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegisterError(null);

    if (isLogin) {
      onLogin({ email: formData.email, password: formData.password });
    } else {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();

        if (data.success) {
          // Auto-login after successful registration
          onLogin({ email: formData.email, password: formData.password });
        } else {
          setRegisterError(data.message);
        }
      } catch (err) {
        setRegisterError('Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setRegisterError(null);
    // Reset form data when switching modes
    setFormData({
      name: '',
      email: isLogin ? '' : 'user@example.com',
      password: isLogin ? '' : 'password123'
    });
  };

  return (
    <div className="login-page">
      <div className="background">
        <div className="rain" />
        <div className="lightning" />
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {isLogin
              ? 'Sign in to analyze UI/UX designs with the Auto Reviewer.'
              : 'Join us to start analyzing your UI/UX designs.'
            }
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="user@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </label>

          {(error || registerError) && (
            <div className="login-error">
              ⚠️ {error || registerError}
            </div>
          )}

          <button className="login-button" type="submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="toggle-button"
              onClick={toggleMode}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-note">
            Use <strong>user@example.com</strong> / <strong>password123</strong>
            for demo access.
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
