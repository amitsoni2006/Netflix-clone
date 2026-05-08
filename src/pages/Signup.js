import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixIntro from '../components/NetflixIntro';

export default function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
    const newUser = { id: Date.now(), name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('netflixUsers', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/');
  };

  if (showIntro) {
    return <NetflixIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="signup-page">
      <div className="signup-bg">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix Background" />
      </div>
      <div className="signup-overlay">
        <div className="signup-form">
          <h1>Create Account</h1>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Create Account</button>
          </form>
          <div className="signup-footer">
            <p>Already have an account? <span onClick={() => navigate('/login')}>Sign in.</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}