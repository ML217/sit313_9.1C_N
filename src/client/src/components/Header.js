import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div style={{ backgroundColor: '#eee', padding: '1em', display: 'flex', justifyContent: 'space-between' }}>
      <div><strong>DEV@Deakin</strong></div>
      <input type="text" placeholder="Search..." style={{ flex: 1, margin: '0 1em' }} />
      <div>
        <Link to="/post">
          <button>Post</button>
        </Link>
        <Link to="/login">
        <button>Login</button>
        </Link>
        <Link to="/signout">
        <button secondary>Signout</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;