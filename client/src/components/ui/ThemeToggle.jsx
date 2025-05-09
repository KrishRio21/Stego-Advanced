import { useState, useEffect } from 'react';
import '../../styles/animations.scss';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = (e) => {
    const button = e.currentTarget;
    button.classList.add('button-ripple');
    setTimeout(() => button.classList.remove('button-ripple'), 600);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="fade-in button-glow"
      style={{ padding: '8px 16px', borderRadius: '4px' }}
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}