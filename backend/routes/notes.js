const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title = '', body = '', tags = [] } = req.body;
    const note = new Note({ title, body, tags, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, body, tags } = req.body;
    if (title !== undefined) note.title = title;
    if (body !== undefined) note.body = body;
    if (tags !== undefined) note.tags = tags;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Not found' });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await note.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
