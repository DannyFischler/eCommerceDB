const express = require('express');
const router = express.Router();
const { Tag, Product, ProductTag } = require('../../models');

const handleError = (res, err, statusCode = 500) => {
    console.log(err);
    res.status(statusCode).json(err);
};

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    handleError(res, err);
  }
});

// GET one tag by id
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, through: ProductTag }],
    });
    tag ? res.status(200).json(tag) : res.status(404).json({ message: 'Tag not found' });
  } catch (err) {
    handleError(res, err, 404);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    handleError(res, err, 400);
  }
});

// PUT a tag
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    updatedTag ? res.json(updatedTag) : res.status(404).json({ message: 'Tag not updated' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

// DELETE a tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });
    deletedTag ? res.json({ message: 'Tag deleted' }) : res.status(404).json({ message: 'Tag not found' });
  } catch (err) {
    handleError(res, err, 400);
  }
});

module.exports = router;
