const Order = require("../models/Order");
const razorpay = require("../services/razorpayService");
const crypto = require("crypto");
const Payment = require("../models/Payment");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE order
exports.createOrder = async (req, res) => {
  try {
    const { phone, items, totalAmount } = req.body;

    const order = await Order.create({
      phone,
      items,
      totalAmount,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CANCEL order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ error: "Order not found" });

    order.status = "cancelled";
    await order.save();

    const phone = order.phone;

    const text =
      `❌ Order Cancelled\n` +
      `Order ID: ${order._id}\n` +
      `As per your request, the order has been cancelled.`;

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    res.json({
      message: "Order cancelled",
      whatsappUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json(paymentOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    const order = await Order.findById(orderId);
    order.status = "paid";
    order.paymentId = razorpay_payment_id;
    await order.save();
    await Payment.create({
      orderId: order._id,
      paymentId: razorpay_payment_id,
      amount: order.totalAmount,
      status: "paid",
    });
    const phone = order.phone;
    const text =
      `🛒 Order Confirmed!\n` +
      `Order ID: ${order._id}\n` +
      `Product Name: ${order.items[0].name}\n` +
      `Amount: ₹${order.totalAmount}\n` +
      `Thank you for shopping!`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    res.json({
    message: "Payment verified",
    whatsappUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};