const express = require("express");
const router = express.Router();

const {
  createOrder,
  cancelOrder,
  createPaymentOrder,
  verifyPayment,
  getOrders
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:id/cancel", cancelOrder);
router.post("/payment-order", createPaymentOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;