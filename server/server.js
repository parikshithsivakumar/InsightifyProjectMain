const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use absolute path for uploads directory
const uploadsDir = path.join(__dirname, 'uploads');

// Check if the directory exists and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created successfully.');
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
} else {
  console.log('Uploads directory already exists.');
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const documentRoutes = require('./routes/document');
const feedbackRoutes = require('./routes/feedback'); // Import feedback routes
app.use('/feedback', feedbackRoutes); // Use feedback routes

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);
app.use('/api/document', documentRoutes);  // ✅ Correct API path


app.get('/test', (req, res) => {
  res.send('Test route working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
