import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [API_BASE]);

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter by category
  const filteredProducts =
    filteredCategory === "All"
      ? products
      : products.filter((p) => p.category === filteredCategory);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product List</h2>

      {/* Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Category: </label>
        <select onChange={(e) => setFilteredCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
              }}
            >
              {/* Product Image */}
              <img
                src={product.imageUrl || "https://via.placeholder.com/150"}
                alt={product.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p style={{ fontSize: "0.9em", color: "#777" }}>{product.category}</p>
              <div style={{ marginTop: "10px" }}>
                <button style={{ marginRight: "10px" }}>View Details</button>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;