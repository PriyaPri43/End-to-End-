const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,
    comment: String,
    reviewerName: String,
    reviewerEmail: String,
    date: Date,
  },
  { _id: false }
);

const dimensionSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  image: String,
  images: [String],
  sku: String,
  weight: Number,
  dimensions: dimensionSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  returnPolicy: String,
  minimumOrderQuantity: Number,
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);