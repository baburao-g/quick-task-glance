
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    default: '#3498db'
  }
}, { 
  timestamps: true 
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
