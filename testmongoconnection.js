onst mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mensWearDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));



This code connects to MongoDB, prints a success message, closes the Mongoose connection, and then exits the Node.js process, returning you to the command prompt.

In a real-world application where you'll be performing CRUD operations or running a web server, you typically wouldn't 
  close the connection like this, as you'd want it to remain open to handle requests from clients. But for a simple test or one-time script, closing the connection when you're done can be useful.
