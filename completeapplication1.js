const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mensWearDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    inStock: Boolean
});

const Product = mongoose.model('Product', productSchema);

// CRUD Endpoints
app.get('/products', (req, res) => {
    Product.find().then(products => res.json(products));
});

app.post('/products', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save().then(product => res.json(product));
});

app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body).then(() => res.json({ success: true }));
});

app.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(() => res.json({ success: true }));
});

// Endpoint to serve the HTML
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Men's Wear eCommerce</title>
    </head>
    <body>
        <h1>Manage Products</h1>
        <form id="product-form">
            <label>Name:</label>
            <input type="text" id="name" required><br>
            <label>Price:</label>
            <input type="number" id="price" required><br>
            <label>Category:</label>
            <input type="text" id="category" required><br>
            <label>In Stock:</label>
            <input type="checkbox" id="inStock"><br>
            <input type="submit" value="Add Product">
        </form>
        <h2>Products</h2>
        <div id="products"></div>
        <script>
            // Function to load products
            function loadProducts() {
                fetch('/products').then(res => res.json()).then(data => {
                    const productsDiv = document.getElementById('products');
                    productsDiv.innerHTML = '';
                    data.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.innerHTML = \`
                            <strong>\${product.name}</strong> - \${product.price} - \${product.category} - In Stock: \${product.inStock}
                        \`;
                        productsDiv.appendChild(productDiv);
                    });
                });
            }

            // Function to add product
            document.getElementById('product-form').addEventListener('submit', function(e) {
                e.preventDefault();

                const product = {
                    name: document.getElementById('name').value,
                    price: document.getElementById('price').value,
                    category: document.getElementById('category').value,
                    inStock: document.getElementById('inStock').checked,
                };

                fetch('/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                })
                .then(() => {
                    loadProducts();
                    document.getElementById('product-form').reset();
                });
            });

            loadProducts();
        </script>
    </body>
    </html>
    `);
});

app.listen(3000, () => console.log('Server running on port 3000'));
