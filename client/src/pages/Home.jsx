import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/animations.scss'; // Make sure this path is correct

export default function Home() {
  return (
    <div
      className="fade-in"
      style={{
        height: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <h1 className="slide-in delay-100" style={{ fontSize: '2.5rem' }}>
        Welcome to <span style={{ color: '#3B82F6' }}>Steg-Ultimate</span>
      </h1>
      <p className="slide-in delay-200" style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
        Encode and decode hidden messages inside images with advanced steganography.
      </p>

      <div
        className="slide-in delay-300"
        style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
      >
        <Link to="/encode">
          <button
            className="button-glow outline-glow pulse"
            style={{
              position: 'relative',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '1rem',
              overflow: 'hidden',
            }}
          >
            🔐 Encode Message
          </button>
        </Link>
        <Link to="/decode">
          <button
            className="button-glow outline-glow pulse"
            style={{
              position: 'relative',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '1rem',
              overflow: 'hidden',
            }}
          >
            🔎 Decode Message
          </button>
        </Link>
      </div>
    </div>
  );
}
