const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env faylini o‘qish uchun

const app = express();
app.use(cors()); // Frontend ulanishi uchun
app.use(express.json()); // JSON ma'lumotlarni o‘qish uchun

// MongoDB ulanishi
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema va Model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const userModel = mongoose.model('items', userSchema);

// API endpoint
app.get('/product', async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});