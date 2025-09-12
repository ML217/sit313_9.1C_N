import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Signup failed: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} />
      <button onClick={handleSignup} style={styles.button}>Create Account</button>
      <p>
        Already have an account? <button onClick={() => navigate('/login')} style={styles.link}>Login</button>
      </p >
      {error && <p style={{ color: 'red' }}>{error}</p >}
    </div>
  );
}

const styles = {
  container: { width: '300px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', textAlign: 'center' },
  input: { display: 'block', width: '100%', padding: '10px', marginBottom: '10px' },
  button: { width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white' },
  link: { background: 'none', color: 'blue', border: 'none', cursor: 'pointer', textDecoration: 'underline' }
};

export default Signup;