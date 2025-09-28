import React from 'react';
import axios from 'axios';

const PricingPage = () => {
  const handleUpgrade = async () => {
    try {
      const response = await axios.post('http://localhost:3001/create-checkout-session');
      window.location.href = response.data.url; // Redirect to Stripe hosted page
    } catch (error) {
      console.error('Error:', error);
      alert('Could not start payment session');
    }
  };

  return (
    <div className="pricing-page">
      <h2>Choose Your Plan</h2>
      <div className="plans">
        <div className="plan">
          <h3>Free Plan</h3>
          <p>- Basic Access</p >
        </div>
        <div className="plan premium">
          <h3>Premium Plan</h3>
          <p>- All Features</p >
          <button onClick={handleUpgrade}>Subscribe to Premium</button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;