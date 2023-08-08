const mongoose = require('mongoose');

// Connecting to MongoDB
const connectionString = 'mongodb://127.0.0.1:27017/mensWearDB';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true }
});

// Creating and Exporting the Model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
