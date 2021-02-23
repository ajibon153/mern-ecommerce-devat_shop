const Category = require('../models/categoryModel');

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if user role =1 === admin
      // only admin can create , delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: 'This category is exist.' });

      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ msg: 'Check admin success' });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Success deleted a Category' });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: 'Updating a Category' });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
