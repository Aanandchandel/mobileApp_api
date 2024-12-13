const Razorpay = require('razorpay');



const razorpayInstance = new Razorpay({
    key_id: 'your_razorpay_key_id', // Replace with your Razorpay Key ID
    key_secret: 'your_razorpay_key_secret' // Replace with your Razorpay Key Secret
  });

  module.exports=razorpayInstance;