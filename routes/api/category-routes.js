const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryList = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    console.log(req.body.category_name, req.params.id);
    const category = await Category.update(
      { category_name: req.body.category_name },
      { returning: true, where: { id: req.params.id } }
    )
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
