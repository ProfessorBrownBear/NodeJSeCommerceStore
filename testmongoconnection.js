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



This code connects to MongoDB, prints a success message, closes the Mongoose connection, and then exits the Node.js process, returning you to the command prompt.

In a real-world application where you'll be performing CRUD operations or running a web server, you typically wouldn't 
  close the connection like this, as you'd want it to remain open to handle requests from clients. But for a simple test or one-time script, closing the connection when you're done can be useful.
