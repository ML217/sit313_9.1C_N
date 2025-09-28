// PricingPlans.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51SBVucChKHFQxLPK1iijLhkyuMfxdwlYRcvjli8orrluo49hcOowBOgxikWUxIIETu1eyiIyR9p3NQhQdHLkWXYp004dvWEow4'); // Replace with your test key

const PricingPlans = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('http://localhost:5000/create-checkout-session', { method: 'POST' });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Pricing Plans</h2>
      <div>
        <h3>Free Plan</h3>
        <ul>
          <li>Post questions</li>
          <li>Read articles</li>
        </ul>
      </div>
      <div>
        <h3>Premium Plan - $10/month</h3>
        <ul>
          <li>Post articles with image</li>
          <li>Access to admin dashboard</li>
          <li>Customize theme</li>
        </ul>
        <button onClick={()=> window.location.href='https://buy.stripe.com/test_4gM5kC0Tv0OI0Ng1b11RC00'}>Subscribe to Premium</button>

      </div>
    </div>
  );
};

export default PricingPlans;