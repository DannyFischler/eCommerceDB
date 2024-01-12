const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Cards',
  },
  {
    category_name: 'Plush Toys',
  },
  {
    category_name: 'Trading Cards',
  },
  {
    category_name: 'Building Sets',
  },
  {
    category_name: 'Action Figures',
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
