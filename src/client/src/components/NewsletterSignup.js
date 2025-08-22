import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const result = await response.text();
      setStatus(result);
      setEmail('');
    } catch (error) {
      setStatus('Failed to subscribe.');
    }
  };

  return (
    <div className="newsletter">
      <h4>SIGN UP FOR OUR DAILY INSIDER</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p>{status}</p >}
    </div>
  );
};

export default NewsletterSignup;