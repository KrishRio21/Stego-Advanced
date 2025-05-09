import { useState, useRef } from 'react';
import { Steganography } from '../utils/steganography';
import '../styles/global.scss';
import '../styles/animations.scss';

export default function Encode() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isEncoding, setIsEncoding] = useState(false);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('lsb');
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  const handleImageUpload = (file) => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({ file, src: img.src });
        setError(null);
      };
      img.onerror = () => {
        setError('Failed to load image. Please try another file.');
      };
    }
  };

  const handleFileInput = (e) => {
    handleImageUpload(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleEncode = (e) => {
    const button = e.currentTarget;
    button.classList.add('button-ripple');
    setTimeout(() => button.classList.remove('button-ripple'), 600);

    if (!image || !image.file) {
      setError('Please upload an image.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }
    setIsEncoding(true);
    setError(null);

    Steganography.encodeMessage(
      image.src,
      message,
      password.trim() || null,
      method,
      (dataUrl, ext, err) => {
        if (err) {
          setError(err.message || 'Failed to encode message.');
          setIsEncoding(false);
          return;
        }
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `encoded_image.${ext}`;
        link.click();
        setIsEncoding(false);
      }
    );
  };

  return (
    <div className="slide-in" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '24px' }}>Encode Message</h1>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '8px' }}>
          Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '4px' }}
          >
            <option value="lsb">LSB (PNG)</option>
            <option value="dct">DCT (JPEG)</option>
          </select>
        </label>
      </div>
      <div
        ref={dropRef}
        className={`dropzone ${isDragging ? 'dropzone-active' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{ marginBottom: '16px' }}
      >
        <p style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
          Drag & drop an image here or click to upload
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          style={{ color: 'var(--button-bg)', cursor: 'pointer' }}
        >
          Choose File
        </label>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to hide"
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password (optional)"
        style={{ width: '100%', marginBottom: '16px' }}
      />
      {error && <p className="error" style={{ marginBottom: '16px' }}>{error}</p>}
      {image && (
        <img
          src={image.src}
          alt="Uploaded"
          style={{
            maxWidth: '300px',
            marginBottom: '16px',
            borderRadius: '8px',
            opacity: '0.9',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
        />
      )}
      <button
        onClick={handleEncode}
        disabled={!image || !message.trim() || isEncoding}
        className="button-glow"
      >
        {isEncoding ? 'Encoding...' : 'Encode'}
      </button>
    </div>
  );
}