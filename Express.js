// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB холболт
mongoose.connect('mongodb://localhost:27017/service-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.json());

// Энгийн API
app.get('/', (req, res) => {
  res.send('Welcome to Service Platform API');
});

// Үйлчилгээ бүртгэх API
app.post('/services', (req, res) => {
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  service.save((err, savedService) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(savedService);
  });
});

// Загвар
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
const Service = mongoose.model('Service', serviceSchema);

// Серверийг ажиллуулах
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
