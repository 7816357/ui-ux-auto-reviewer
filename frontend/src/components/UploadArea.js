import React, { useRef, useState } from 'react';
import './UploadArea.css';

function UploadArea({ onFileUpload, loading, error }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileUpload(file);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        onFileUpload(file);
      }
    }
  };

  return (
    <div className="upload-container">
      <div
        className={`upload-area ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Analyzing your design...</p>
          </div>
        ) : (
          <>
            <div className="upload-icon">📤</div>
            <h2>Drag and drop your UI design here</h2>
            <p>or</p>
            <button
              className="browse-button"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse Files
            </button>
            <p className="file-info">Supported formats: PNG, JPG, GIF, WebP (Max 50MB)</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default UploadArea;
