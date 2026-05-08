import React, { useState } from 'react';

export default function HelpCenter({ onBack }) {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to backend
    alert('Message sent! We will get back to you soon.');
    setMessage('');
    setSubject('');
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>Help Center</h1>
      </div>
      <div className="help-content">
        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How do I change my password?</h3>
            <p>Go to Account settings and click "Change Password".</p>
          </div>
          <div className="faq-item">
            <h3>How do I cancel my membership?</h3>
            <p>Contact our support team through the form below.</p>
          </div>
          <div className="faq-item">
            <h3>Can I download movies?</h3>
            <p>Download feature is coming soon!</p>
          </div>
        </div>
        <div className="contact-section">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}