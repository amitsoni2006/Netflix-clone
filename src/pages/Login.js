import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixIntro from '../components/NetflixIntro';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock login - in real app, verify with backend
    const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  if (showIntro) {
    return <NetflixIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Netflix Background" />
      </div>
      <div className="login-overlay">
        <div className="login-form">
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <div className="login-footer">
            <p>New to Netflix? <span onClick={() => navigate('/signup')}>Sign up now.</span></p>
            <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
          </div>
        </div>
      </div>
    </div>
  );
}