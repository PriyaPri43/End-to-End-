import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../features/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (a, i) => a + i.price * i.qty,
    0
  );

  const handlePayment = async () => {
    // create order in DB
    const orderRes = await axios.post(
      "https://end-to-end-7.onrender.com/api/orders",
      {
        phone: "919790279592",
        items,
        totalAmount: total,
      }
    );

    const orderId = orderRes.data._id;

    // create Razorpay order
    const payRes = await axios.post(
      "https://end-to-end-7.onrender.com/api/orders/payment-order",
      { amount: total }
    );

    const rzpOrder = payRes.data;

    const options = {
      key: "rzp_test_SHvkG7VMOsPsQA",
      amount: rzpOrder.amount,
      currency: "INR",
      order_id: rzpOrder.id,

      modal: {
        ondismiss: function () {
        alert("Payment cancelled");
        },
      }, 

      handler: async function (response) {
        const verifyRes = await axios.post("https://end-to-end-7.onrender.com/api/orders/verify-payment",
        {
          ...response,
        orderId,
        }
        );

        alert("Payment successful!");

       // 👉 open WhatsApp confirmation
        window.open(verifyRes.data.whatsappUrl, "_blank");
        dispatch(clearCart());
    },
  };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <h4>Total: ₹{total}</h4>

      <button className="btn btn-success" onClick={handlePayment}>
        Pay with Razorpay
      </button>
    </div>
  );
}