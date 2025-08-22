const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.mandrillapp.com',
  port: 587,
  secure: false,
  auth: {
    user: 's221127867@deakin.edu.au',
    pass: 'md-shGaDlKZASohyfYo_MgYA'
  }
});

app.post('/subscribe', async (req, res) => {
  const email = req.body.email;
  try {
    const response = await axios.post('https://mandrillapp.com/api/1.0/messages/send.json', {
      key: 'md-shGaDlKZASohyfYo_MgYA',
      message: {
        from_email: 's221127867@deakin.edu.au',
        to: [{ email, type: 'to' }],
        subject: 'Welcome to @Dev Deakin!',
        text: 'Thanks for subscribing to our Daily Insider!',
        html: '<strong>Thanks for subscribing to our Daily Insider!</strong>'
      }
    });
    console.log('Email Sent:', response.data);
    res.send('Welcome email sent successfully!');
  } catch (error) {
    console.error('Email Error:', error.response?.data || error.message);
    res.status(500).send('Failed to send welcome email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});