import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Encode from './pages/Encode';
import Decode from './pages/Decode';
import ThemeToggle from './components/ui/ThemeToggle';
import './styles/global.scss';
import './styles/animations.scss';

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div className="fade-in min-h-screen">
        <nav
          style={{
            padding: '16px',
            borderBottom: '1px solid var(--input-border)',
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#64b5f6' : 'var(--text)',
                  marginRight: '16px',
                  textDecoration: 'none',
                  fontWeight: isActive ? '600' : 'normal',
                })}
              >
                Home
              </NavLink>
              <NavLink
                to="/encode"
                style={({ isActive }) => ({
                  color: isActive ? '#64b5f6' : 'var(--text)',
                  marginRight: '16px',
                  textDecoration: 'none',
                  fontWeight: isActive ? '600' : 'normal',
                })}
              >
                Encode
              </NavLink>
              <NavLink
                to="/decode"
                style={({ isActive }) => ({
                  color: isActive ? '#64b5f6' : 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: isActive ? '600' : 'normal',
                })}
              >
                Decode
              </NavLink>
            </div>
            <ThemeToggle onToggle={(t) => setTheme(t)} />
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encode" element={<Encode />} />
          <Route path="/decode" element={<Decode />} />
        </Routes>
      </div>
    </Router>
  );
}
