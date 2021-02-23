const Products = require('../models/productModels');

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // req.query
    const excludedFields = ['page', 'sort', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => '$' + match
    );
    // gte = greater than or equal
    // lte = lesser than or equal
    // lt = lesser than
    // gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;
      res.json({ success: true, total_data: products.length, data: products });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      console.log('crete', req.body);

      if (!images)
        return res
          .status(400)
          .json({ success: false, msg: 'No image selected.' });

      const product = await Products.findOne({ product_id });
      if (product)
        return res
          .status(400)
          .json({ success: false, msg: 'This product already exists.' });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({
        success: true,
        msg: 'Created Product Succes',
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error.message });
    }
  },

  updateProducts: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      console.log('upd', req.body);
      if (!images)
        return res
          .status(400)
          .json({ success: false, msg: 'No image selected.' });

      let tes = await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      console.log('tes', tes);
      res.json({ msg: 'Succes Update Product' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted a Product' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
