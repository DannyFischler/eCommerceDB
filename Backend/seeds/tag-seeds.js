const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Rare',
  },
  {
    tag_name: 'Collectible',
  },
  {
    tag_name: 'Limited Edition',
  },
  {
    tag_name: 'For Kids',
  },
  {
    tag_name: 'Popular',
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
