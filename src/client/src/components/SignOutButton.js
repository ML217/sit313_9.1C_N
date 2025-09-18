import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after sign-out
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        backgroundColor: '#e33647ff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        cursor: 'pointer',
        marginTop: '10px',
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;