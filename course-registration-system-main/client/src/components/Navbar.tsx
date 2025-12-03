import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage or prefers-color-scheme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      const isDark = saved === 'dark';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    // add a temporary class to enable smooth theme animation
    document.documentElement.classList.add('theme-animating');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    // remove the animating flag after transition
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-animating');
    }, 360);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="flex justify-between items-center" style={{ height: 64 }}>
          <Link to="/" className="flex items-center" style={{ gap: 12 }}>
            <div style={{ width: 36, height: 36 }} className="avatar-chip">CR</div>
            <div>
              <span className="brand-title">Course Registration</span>
              <p className="brand-subtitle">Fall 2024</p>
            </div>
          </Link>

          {user ? (
            <div className="flex items-center" style={{ gap: 24 }}>
              <div className="nav-links">
                <Link to="/" className={`nav-link ${isActive('/') || isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
                <Link to="/courses" className={`nav-link ${isActive('/courses') ? 'active' : ''}`}>Courses</Link>
                <Link to="/my-registrations" className={`nav-link ${isActive('/my-registrations') ? 'active' : ''}`}>My Registrations</Link>
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>Profile</Link>
              </div>
              {/* Dark mode toggle */}
              <button aria-label="Toggle dark mode" className="theme-toggle" onClick={toggleTheme} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                <span role="img" aria-hidden>{darkMode ? '☀️' : '🌙'}</span>
              </button>

              <div className="relative">
                <button 
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="user-avatar">{user ? getInitials(user.firstName, user.lastName) : 'U'}</div>
                  <div className="text-right">
                    <p className="user-name">{user?.firstName} {user?.lastName}</p>
                    <p className="user-id">{user?.studentId}</p>
                  </div>
                  <svg className={`chevron ${showUserMenu ? 'open' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showUserMenu && (
                  <div className="user-menu">
                    <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>Profile</Link>
                    <button className="user-menu-item danger" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center" style={{ gap: 12 }}>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
