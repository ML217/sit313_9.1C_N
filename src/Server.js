const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
//Stripe dashboard secret Key 
const stripe = require('stripe')('sk_test_51SBVucChKHFQxLPK4vxas0UPbz60R75GaXHsnvf7WIuH7KfszgvxCW8k8zJsGP7DdiOp3bjyQex1HKhKvpmvCNKy001h53psXv');  

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static('public'));


//Mandrill Email API
app.post('/subscribe', async (req, res) => {
  console.log('Received email request:', req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required.');
  }

  try {
    const response = await axios.post('https://mandrillapp.com/api/1.0/messages/send.json', {
      key: 'md-sh6JaDlKZA5ohyfO_MgYgA', 
      message: {
        from_email: 's221278697@deakin.edu.au',
        to: [{ email, type: 'to' }],
        subject: 'Welcome to @Dev Deakin!',
        text: 'Thanks for subscribing to our Daily Insider!',
        html: '<strong>Thanks for subscribing to our Daily Insider!</strong>'
      }
    });

    console.log('Email sent:', response.data);
    res.send('Welcome email sent successfully!');
  } catch (error) {
    console.error('Email error:', error.response?.data || error.message);
    res.status(500).send('Failed to send welcome email.');
  }
});

// Stripe Checkout Endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'Premium Plan',
            },
            unit_amount: 999, // $9.99 AUD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',  
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error:', err.message);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});