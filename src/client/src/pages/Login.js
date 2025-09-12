import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
      <button onClick={handleLogin} style={styles.button}>Login</button>
      <p>
        Don’t have an account? <button onClick={() => navigate('/signup')} style={styles.link}>Sign Up</button>
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

export default Login;