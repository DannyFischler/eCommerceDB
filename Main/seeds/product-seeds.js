const { Product } = require('../models');

const productData = [
  {
    product_name: 'Charizard Pokémon Card',
    price: 150.00,
    stock: 5,
    category_id: 1 // Assign to 'Pokémon Cards'
  },
  {
    product_name: 'Pikachu Plush Toy',
    price: 20.00,
    stock: 30,
    category_id: 2 // Assign to 'Plush Toys'
  },
  {
    product_name: 'Yu-Gi-Oh! Blue Eyes White Dragon Card',
    price: 80.00,
    stock: 7,
    category_id: 1 // Assign to 'Trading Cards'
  },
  {
    product_name: 'LEGO Star Wars Millennium Falcon',
    price: 160.00,
    stock: 12,
    category_id: 4 // Assign to 'Building Sets'
  },
  {
    product_name: 'Super Mario Action Figure',
    price: 25.00,
    stock: 20,
    category_id: 5 // Assign to 'Action Figures'
  }

];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
