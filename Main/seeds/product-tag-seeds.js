const { ProductTag } = require('../models');

const productTagData = [
  {
    product_id: 1, // Charizard Pokémon Card
    tag_id: 1 // Rare
  },
  {
    product_id: 1, // Charizard Pokémon Card
    tag_id: 2 // Collectible
  },
  {
    product_id: 2, // Pikachu Plush Toy
    tag_id: 4 // For Kids
  },
  {
    product_id: 3, // Yu-Gi-Oh! Blue Eyes White Dragon Card
    tag_id: 1 // Rare
  },
  {
    product_id: 3, // Yu-Gi-Oh! Blue Eyes White Dragon Card
    tag_id: 2 // Collectible
  },
  {
    product_id: 4, // LEGO Star Wars Millennium Falcon
    tag_id: 3 // Limited Edition
  },
  {
    product_id: 5, // Super Mario Action Figure
    tag_id: 4 // For Kids
  },
  {
    product_id: 5, // Super Mario Action Figure
    tag_id: 5 // Popular
  }
];

const seedProductTags = () => ProductTag.bulkCreate(productTagData);

module.exports = seedProductTags;
