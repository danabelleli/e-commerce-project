const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsList = await Tag.findAll();
    res.status(200).json(tagsList);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(
      { tag_name: req.body.tag_name },
      { returning: true, where: { id: req.params.id } }
    )
    if (!tag) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
