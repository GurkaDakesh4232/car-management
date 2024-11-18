const express = require("express");
const mongoose = require("./db"); // Ensure you correctly export Mongoose in `db.js`
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer"); // Import Multer for handling file uploads
const path = require("path");
const fs = require("fs");
const userRoutes = require('./routes/users');

// Import Routes
const carRoutes = require("./routes/cars");



// Initialize Express
const app = express();
app.use('/api/auth', userRoutes);

// Middleware
app.use(cors()); // Enables cross-origin resource sharing
app.use(bodyParser.json()); // Parses incoming JSON requests

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer to store images in 'uploads' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamped filenames
  },
});

// File validation: only images allowed
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Serve static files (to access uploaded images)
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/cars", carRoutes); // Connect car-related routes

// Route to upload car images
app.post("/upload-car-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image uploaded.");
  }
  const imagePath = `/uploads/${req.file.filename}`;
  res.json({ imageUrl: imagePath }); // Send back the image URL to the frontend
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started on port ${port}`));
