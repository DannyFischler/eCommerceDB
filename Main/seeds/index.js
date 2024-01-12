const sequelize = require('../config/connection');
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const seedAll = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); // Disable FK checks

  // Drop tables in the correct order
  await sequelize.query('DROP TABLE IF EXISTS `product_tag`');
  await sequelize.query('DROP TABLE IF EXISTS `tag`');
  await sequelize.query('DROP TABLE IF EXISTS `product`');
  await sequelize.query('DROP TABLE IF EXISTS `category`');

  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // Re-enable FK checks

  // Now sync and seed
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
