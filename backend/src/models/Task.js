
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  reminder: {
    type: Boolean,
    default: false
  },
  reminderEmail: {
    type: String,
    default: null
  },
  reminderTime: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
