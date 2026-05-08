import React, { useState, useRef } from 'react';

export default function Account({ user, onBack }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileImage: user.profileImage || null
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, profileImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Update user in localStorage
    const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? { ...u, ...formData } : u);
    localStorage.setItem('netflixUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...user, ...formData }));
    setEditing(false);
    // You might want to update the user state in App.js
    window.location.reload(); // Refresh to update navbar
  };

  const getProfileAvatar = (name, image) => {
    if (image) {
      return image;
    }
    const firstLetter = name.charAt(0).toUpperCase();
    const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#e50914"/>
      <text x="50" y="65" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="white">${firstLetter}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className="account-page">
      <div className="account-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>Account</h1>
      </div>
      <div className="account-content">
        <div className="profile-section">
          <div className="profile-avatar-large-container">
            <img
              src={getProfileAvatar(formData.name, formData.profileImage)}
              alt="Profile"
              className="profile-avatar-large"
            />
            {editing && (
              <button
                className="change-avatar-btn"
                onClick={() => fileInputRef.current.click()}
              >
                Change Photo
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <h2>{formData.name}</h2>
        </div>
        <div className="account-details">
          <h3>Membership & Billing</h3>
          <div className="detail-item">
            <span>Name:</span>
            {editing ? (
              <input name="name" value={formData.name} onChange={handleChange} />
            ) : (
              <span>{user.name}</span>
            )}
          </div>
          <div className="detail-item">
            <span>Email:</span>
            {editing ? (
              <input name="email" value={formData.email} onChange={handleChange} />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
          <div className="detail-item">
            <span>Phone:</span>
            {editing ? (
              <input name="phone" value={formData.phone} onChange={handleChange} />
            ) : (
              <span>{user.phone}</span>
            )}
          </div>
          <div className="detail-item">
            <span>Member since:</span>
            <span>{new Date(user.id).toLocaleDateString()}</span>
          </div>
          <div className="account-actions">
            {editing ? (
              <>
                <button onClick={handleSave}>Save Changes</button>
                <button onClick={() => {
                  setFormData({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    profileImage: user.profileImage || null
                  });
                  setEditing(false);
                }}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}