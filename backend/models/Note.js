const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  tags: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
