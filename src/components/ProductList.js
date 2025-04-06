import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((response) => {
        console.log("Fetched products:", response.data); // ✅ For debugging
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const categories = ["All", ...new Set(Array.isArray(products) ? products.map(p => p.category) : [])];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛍️ Welcome to AR COLLECTIONS</h2>

      <label>
        <strong>Filter by Category:</strong>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
            <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p style={{ fontSize: "14px", color: "#777" }}>{product.description}</p>
              <button style={{ backgroundColor: "#333", color: "white", padding: "5px 10px", marginTop: "10px", borderRadius: "5px" }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;