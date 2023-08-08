const products = [
  { name: 'T-Shirt', price: 20, category: 'Shirts', inStock: true },
  { name: 'Jeans', price: 50, category: 'Pants', inStock: true },
  { name: 'Boots', price: 75, category: 'Footwear', inStock: true },
  { name: 'Jacket', price: 100, category: 'Outerwear', inStock: true },
];

Product.insertMany(products)
  .then(() => console.log('Data added'))
  .catch(err => console.error('Insert error', err));
