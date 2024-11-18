const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  tags: [{ type: String }], // Array of tags like 'car_type', 'company', etc.
  car_type: { type: String, required: true },
  company: { type: String, required: true },
  dealer: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created the car listing
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Car = mongoose.model('cars', carSchema);

module.exports = Car;
