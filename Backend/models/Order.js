const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    qty: Number,
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  phone: String,
  items: [orderItemSchema],
  totalAmount: Number,
  status: {
    type: String,
    default: "placed",
  },
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);