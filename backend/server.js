const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Allow CORS for all origins (you can restrict this in production)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Razorpay API credentials
const RAZORPAY_KEY = 'rzp_live_xfQ1vi23l3sFzy'; // Your Razorpay Key ID
const RAZORPAY_SECRET = 'QxzRGmAhnnugODoZtARFub4F'; // Your Razorpay Secret


// //fake
// const RAZORPAY_KEY = "rzp_test_7QvpPBtnZZFuWq"; // Your Razorpay Key ID
// const RAZORPAY_SECRET = "V4nQnGOurcBdY8frHAFqmVb0"; // Your Razorpay Secret


// API route to create a Razorpay order
app.post('/create-order', async (req, res) => {
  const amount = req.body.amount; // Amount in paise
  
  try {
    // Make request to Razorpay's order creation API
    const response = await axios.post(
      'https://api.razorpay.com/v1/orders',
      {
        amount: amount,
        currency: 'INR',
        receipt: 'order_rcptid_11', // Unique receipt identifier
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString('base64'),
        },
      }
    );
    // Send the created order ID back to the frontend
    res.json({ orderId: response.data.id, amount: response.data.amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Error creating order');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
