const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

async function importProducts() {
  try {
    const res = await axios.get("https://dummyjson.com/products");

    const products = res.data.products.map((p) => ({
      name: p.title,
      description: p.description,
      category: p.category,
      price: p.price * 100,
      discountPercentage: p.discountPercentage,
      rating: p.rating,
      stock: p.stock,
      image: p.thumbnail,
      images: p.images,
      sku: p.sku,
      weight: p.weight,
      dimensions: p.dimensions,
      warrantyInformation: p.warrantyInformation,
      shippingInformation: p.shippingInformation,
      availabilityStatus: p.availabilityStatus,
      returnPolicy: p.returnPolicy,
      minimumOrderQuantity: p.minimumOrderQuantity,
      reviews: p.reviews,
    }));

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products imported");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

mongoose.connect(process.env.MONGO_URI).then(importProducts);