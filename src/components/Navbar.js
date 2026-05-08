import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ search, setSearch, onSearch, user, logout, activeSection, onNavClick }) {
  const [inputValue, setInputValue] = useState(search);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
      onSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch, onSearch]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getProfileAvatar = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    // Create a simple SVG avatar
    const svg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#e50914"/>
      <text x="16" y="22" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="white">${firstLetter}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleProfileClick = () => {
    navigate('/account');
  };

  const handleHelpClick = () => {
    navigate('/help');
  };

  return (
    <div className="navbar">
      <div className="logo">NETFLIX</div>
      <div className="nav-links">
        <a
          href="#home"
          className={activeSection === 'home' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); onNavClick('home'); }}
        >
          Home
        </a>
        <a
          href="#tv"
          className={activeSection === 'tv' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); onNavClick('tv'); }}
        >
          TV Shows
        </a>
        <a
          href="#movies"
          className={activeSection === 'movies' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); onNavClick('movies'); }}
        >
          Movies
        </a>
        <a
          href="#new"
          className={activeSection === 'new' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); onNavClick('new'); }}
        >
          New & Popular
        </a>
        <a
          href="#mylist"
          className={activeSection === 'mylist' ? 'active' : ''}
          onClick={(e) => { e.preventDefault(); onNavClick('mylist'); }}
        >
          My List
        </a>
      </div>
      <div className="nav-right">
        <input
          className="search-input"
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img
            src={getProfileAvatar(user.name)}
            alt="Profile"
            className="profile-avatar"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
          <span className="profile-arrow">▼</span>
          {showDropdown && (
            <div className="profile-dropdown">
              <a href="#manage">Manage Profiles</a>
              <a href="#account" onClick={(e) => { e.preventDefault(); handleProfileClick(); }}>Account</a>
              <a href="#help" onClick={(e) => { e.preventDefault(); handleHelpClick(); }}>Help Center</a>
              <hr />
              <a href="#signin" onClick={(e) => { e.preventDefault(); logout(); }}>Sign out of Netflix</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
