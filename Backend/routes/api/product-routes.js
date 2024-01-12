const express = require('express');
const router = express.Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

const handleError = (res, err, statusCode = 500) => {
    console.log(err);
    res.status(statusCode).json(err);
};

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    handleError(res, err);
  }
});

// GET one product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [Category, { model: Tag, through: ProductTag }],
    });
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map(tag_id => ({ product_id: product.id, tag_id }));
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      res.status(200).json({ product, productTagIds });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    handleError(res, err, 400);
  }
});

// PUT (update) a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, { where: { id: req.params.id } });
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
        .map(tag_id => ({ product_id: req.params.id, tag_id }));
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.json(product);
  } catch (err) {
    handleError(res, err, 400);
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const products = await Product.destroy({ where: { id: req.params.id } });
    res.json(products);
  } catch (err) {
    handleError(res, err, 400);
  }
});

module.exports = router;
