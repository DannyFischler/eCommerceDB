const express = require('express');
const router = express.Router();
const { Category, Product } = require('../../models');

const handleError = (res, err, statusCode = 500) => res.status(statusCode).json(err);

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [Product] });
    res.json(categories);
  } catch (err) {
    handleError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { id: req.params.id },
      include: [Product],
    });
    category ? res.json(category) : res.status(404).json({ message: 'Category not found' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    handleError(res, err, 400);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });
    updatedCategory ? res.json(updatedCategory) : res.status(404).json({ message: 'Category not updated' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
    deletedCategory ? res.json({ message: 'Category deleted' }) : res.status(404).json({ message: 'Category not found' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

module.exports = router;
