import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  PhoneAuthProvider,
  multiFactor,
  RecaptchaVerifier
} from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [resolver, setResolver] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/multi-factor-auth-required') {
        const resolver = multiFactor(auth).getResolver(err);
        setResolver(resolver);

        const recaptcha = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
        }, auth);

        const phoneInfoOptions = {
          multiFactorHint: resolver.hints[0],
          session: resolver.session
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptcha);

        setResolver({ ...resolver, verificationId });
      } else {
        setError('Login failed: ' + err.message);
      }
    }
  };

  const handle2FAVerify = async () => {
    try {
      const cred = PhoneAuthProvider.credential(resolver.verificationId, verificationCode);
      const multiFactorAssertion = PhoneAuthProvider.assertion(cred);
      await resolver.resolveSignIn(multiFactorAssertion);
      navigate('/');
    } catch (err) {
      setError('2FA verification failed: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      {!resolver && (
        <>
          <button onClick={handleLogin} style={styles.button}>Login</button>
          <div id="recaptcha-container"></div>
        </>
      )}

      {resolver && (
        <>
          <input
            type="text"
            placeholder="Enter 2FA code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            style={styles.input}
          />
          <button onClick={handle2FAVerify} style={styles.button}>Verify 2FA</button>
        </>
      )}

      <p>
        Use Phone <button onClick={() => navigate('/loginwithphone')} style={styles.link}>Phone</button>
        Don’t have an account? <button onClick={() => navigate('/signup')} style={styles.link}>Sign Up</button>
      </p >
      {error && <p style={{ color: 'red' }}>{error}</p >}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
  },
  link: {
    background: 'none',
    color: 'blue',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;