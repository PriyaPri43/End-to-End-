import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const canCancel = (createdAt) => {
    const orderDate = new Date(createdAt);
    const now = new Date();

    const diffMs = now - orderDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays <= 2;
};

  const loadOrders = () => {
    axios
      .get("https://end-to-end-7.onrender.com/api/orders")
      .then((res) => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (id) => {
    const res = await axios.patch(
      `https://end-to-end-7.onrender.com/api/orders/${id}/cancel`
    );

    alert("Order cancelled");

    window.open(res.data.whatsappUrl, "_blank");

    loadOrders();
  };


  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.map((o) => (
        <div key={o._id} className="border p-3 mb-3 rounded">
          <h2>Product Name: {o.items[0]?.name || "Unknown Item"}</h2>
          <h6>Order ID: {o._id}</h6>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.totalAmount}</p>

          {o.status === "paid" && canCancel(o.createdAt) && (
            <button
            className="btn btn-danger"
            onClick={() => cancelOrder(o._id)}
            >
            Cancel Order
            </button>
          )}

          {o.status === "paid" && !canCancel(o.createdAt) && (
            <p className="text-muted">
            Cancellation period expired (2 days limit)
            </p>
          )}
        </div>
      ))}
    </div>
  );
}