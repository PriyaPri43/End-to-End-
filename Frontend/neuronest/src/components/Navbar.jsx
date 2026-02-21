import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const cart = useSelector((s) => s.cart.items);

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex align-items-center sticky-top shadow">
      
      {/* LEFT — LOGO */}
      <div className="d-flex align-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/891/891440.png"
          alt="logo"
          style={{ width: 40, height: 40, objectFit: "contain" }}
        />
      </div>

      {/* CENTER — BRAND */}
      <div className="mx-auto">
        <Link
          className="navbar-brand fw-bold fs-4 text-bluelight"
          to="/"
        >
          E-commerce Shoppiee
        </Link>
      </div>

      {/* RIGHT — ACTIONS */}
      <div className="d-flex align-items-center gap-2">
        <Link className="btn btn-warning" to="/cart">
          Cart ({cart.length})
        </Link>

        <Link className="btn btn-info" to="/orders">
          Orders
        </Link>
      </div>
    </nav>
  );
}