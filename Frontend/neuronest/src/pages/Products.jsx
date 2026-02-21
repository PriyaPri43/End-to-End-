import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      <input
        className="form-control mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {products.filter((p) =>
           p.name.toLowerCase().includes(search.toLowerCase())
           )
          .map((p) => (
          <div className="col-md-3 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={p.image}
                className="card-img-top"
                style={{ height: 200, objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h6>{p.name}</h6>
                <p className="text-muted small">{p.category}</p>
                <h5 className="text-success">₹{Math.round(p.price)}</h5>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}