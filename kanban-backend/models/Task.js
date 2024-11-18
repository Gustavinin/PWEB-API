// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  dueDate: { type: Date },
  assignees: [{ type: String }],
  status: { type: String, enum: ['toDo', 'inProgress', 'done'], default: 'toDo' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
