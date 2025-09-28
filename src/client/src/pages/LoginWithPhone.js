import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

const LoginWithPhone = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState('');

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => handleSendOTP()
      });
    }
  };

  const handleSendOTP = async () => {
    if (!phone) return alert('Please enter a valid phone number');

    setupRecaptcha();

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      setMessage('OTP has been sent to your phone.');
    } catch (error) {
      console.error('SMS not sent:', error);
      setMessage('Failed to send SMS. Try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      setMessage('Login successful!');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setMessage('Invalid OTP. Try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login with Phone</h2>

      <input
        type="tel"
        placeholder="+61xxxxxxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>

      {confirmation && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>

      {message && <p style={{ color: 'green' }}>{message}</p >}
    </div>
  );
};

export default LoginWithPhone;