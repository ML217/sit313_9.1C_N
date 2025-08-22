import React from 'react';

const Footer = () => (
  <footer>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h4>Explore</h4>
        <p>Home<br />Questions<br />Articles<br />Tutorials</p >
      </div>
      <div>
        <h4>Support</h4>
        <p>FAQs<br />Help<br />Contact Us</p >
      </div>
      <div>
        <h4>Stay connected</h4>
        <p>🔗 Facebook<br />🔗 Instagram<br />🔗 Twitter</p >
      </div>
    </div>
    <p style={{ textAlign: 'center', marginTop: '2em' }}>
      DEV@Deakin 2022<br />
      Privacy Policy | Terms | Code of Conduct
    </p >
  </footer>
);
export default Footer;