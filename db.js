const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Get MongoDB URI from environment variables for security
const mongoURL = process.env.MONGO_URI || 'your-fallback-connection-string'; 

// Connect to MongoDB without deprecated options
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

module.exports = mongoose;
