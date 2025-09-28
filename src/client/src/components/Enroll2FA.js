import React, { useState, useEffect, useRef } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { app, auth, db, storage } from '../firebase';

const Enroll2FA = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState('');
  const recaptchaRef = useRef(null);

  const auth = getAuth(app);
  const db = getDatabase(app);

  useEffect(() => {
    const fetchPhone = async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await get(ref(db, 'users/' + user.uid));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPhone(data.phone); 
        }
      }
    };
    fetchPhone();
  }, [auth]);

  const setupRecaptcha = () => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          console.warn('reCAPTCHA expired, refresh the page.');
        },
      });
    }
    return recaptchaRef.current;
  };

  const sendOTP = async () => {
    try {
      const appVerifier = setupRecaptcha();
      const fullPhone = phone.startsWith('+') ? phone : '+61' + phone; // Adjust for Australia
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setMessage('OTP sent to your phone.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      setMessage('Phone number verified successfully!');
    } catch (error) {
      setMessage('Invalid OTP. Try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Enroll in SMS 2FA</h2>
      <p><strong>Phone:</strong> {phone}</p >

      <button onClick={sendOTP} disabled={!phone}>
        Send OTP
      </button>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginTop: '1rem', display: 'block' }}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}

      <div id="recaptcha-container"></div>
      {message && <p>{message}</p >}
    </div>
  );
};

export default Enroll2FA;