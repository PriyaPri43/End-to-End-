import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (a, i) => a + Math.round(i.price) * i.qty,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Cart</h2>

      {items.map((i) => (
        <div
  key={i._id}
  className="d-flex align-items-center border rounded p-3 mb-3 shadow-sm"
>
  {/* LEFT — IMAGE */}
  <img
    src={i.image}
    width={70}
    style={{ objectFit: "cover", borderRadius: 8 }}
  />

  {/* CENTER — INFO */}
  <div className="ms-3">
    <h6 className="mb-1">{i.name}</h6>
    <p className="mb-0 text-success fw-bold">
      ₹{Math.round(i.price)}
    </p>
  </div>

  {/* RIGHT — QUANTITY */}
  <div className="ms-auto d-flex align-items-center">
    <button
      className="btn btn-sm btn-outline-danger"
      onClick={() => dispatch(removeFromCart(i._id))}
    >
      −
    </button>

    <span className="mx-3 fw-bold">{i.qty}</span>

    <button
      className="btn btn-sm btn-outline-success"
      onClick={() => dispatch(addToCart(i))}
    >
      +
    </button>
  </div>
</div>
      ))
      }
      <h4>Total: ₹{total}</h4>

      <Link className="btn btn-success" to="/checkout">
        Checkout
      </Link>
    </div>
  );
}