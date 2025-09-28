const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors'); // ADD THIS

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // FIX: Ensure JSON parsing is supported
app.use(express.static(__dirname));
app.use(express.static('public'));

// Mandrill transporter (Optional: fallback if not using axios directly)
const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  secure: false,
  auth: {
    user: 's221278697@deakin.edu.au',
    pass: 'md-sh6JaDlKZA5ohyfO_MgYgA'
  }
});

// POST /subscribe endpoint
app.post('/subscribe', async (req, res) => {
  console.log('Received email request:', req.body); // DEBUG LOG
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

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
