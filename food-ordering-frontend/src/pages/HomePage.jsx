import React, { useState, useEffect, useRef } from "react";
import axios from "../axiosInstance";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useCart } from "../CartContext";
import "./HomePage.css"; // Import CSS file for spinner

const loadingMessages = [
  "Preparing your delicious order...",
  "Cooking up something special!",
  "Hang tight! Your food is on its way...",
  "Just a moment, great flavors ahead!",
  "Delivering happiness to your doorstep!",
  "Bringing the taste of joy to you!",
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems, updateCart } = useCart();

  // Fetch categories and products for normal users
  const fetchCategoriesAndProducts = async () => {
    try {
      const categoriesResponse = await axios.get("/api/user/categories");
      const productsResponse = await axios.get("/api/user/products");

      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  const handleLogout = () => {
    // Clear authentication tokens or any user-related data
    localStorage.removeItem("token"); // or however you manage authentication
    navigate("/"); // Redirect to the login page
  };

  const handleSearchClick = () => {
    console.log(searchTerm);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // If the category is already selected, set it to null
    } else {
      setSelectedCategory(categoryId); // Otherwise, set the new category
    }
  };

  // Adjust the filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toString() === selectedCategory.toString()
      : true;

    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  const handleAddToCart = (product) => {
    updateCart(product._id, (cartItems[product._id] || 0) + 1);
  };

  const handleRemoveFromCart = (product) => {
    updateCart(product._id, Math.max((cartItems[product._id] || 0) - 1, 0));
  };
  return (
    <div style={{ padding: "20px" }}>
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2c3e50",
          padding: "10px 20px",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaBars
            size={25}
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={toggleMenu}
          />
          <span style={{ fontSize: "18px" }}>Akasa Order</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search for Grocery, Stores, Vegetable or Meat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              flexGrow: 1,
              borderRadius: "5px",
              border: "none",
              marginRight: "10px",
            }}
          />
          <FaSearch
            size={20}
            style={{ cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaShoppingCart
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/cart", { state: { cartItems, products } })
            }
          />
          <span style={{ marginLeft: "5px" }}>
            {Object.values(cartItems).reduce((acc, val) => acc + val, 0)}
          </span>
        </div>
      </div>

      {/* Sliding Menu */}

      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#34495e",
            color: "white",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Menu</h2>
            <FaTimes
              size={20}
              style={{ cursor: "pointer" }}
              onClick={toggleMenu}
            />
          </div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ margin: "10px 0" }}>Home</li>
            <li
              style={{ margin: "10px 0", cursor: "pointer" }}
              onClick={() => navigate("/orders")} // Link to the Orders page
            >
              Orders
            </li>
            <li style={{ margin: "10px 0" }}>Profile</li>
            <li
              style={{ margin: "10px 0", cursor: "pointer" }}
              onClick={handleLogout} // Call the logout function
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* Categories Section */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginTop: "20px",
          paddingBottom: "10px",
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            style={{
              backgroundColor:
                selectedCategory === category._id ? "#3498db" : "#2980b9",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
              marginRight: "10px",
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            {/* Category Image */}
            {category.image ? (
              <img
                src={
                  category.image.startsWith("data:image")
                    ? category.image
                    : `data:image/jpeg;base64,${category.image}`
                }
                alt={category.name}
                style={{
                  width: "100%",
                  height: "150px", // Fixed height for consistency
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: "#ccc",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Image
              </div>
            )}
            <div>{category.name}</div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <h2>
            {
              loadingMessages[
                Math.floor(Math.random() * loadingMessages.length)
              ]
            }
          </h2>{" "}
          {/* Randomly selected message */}
        </div>
      ) : (
        <>
          {/* Products Section - Grid Layout */}
          <h2 style={{ marginTop: "20px" }}>Products</h2>
          {filteredProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {/* Product Image */}
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("data:image")
                          ? product.image
                          : `data:image/jpeg;base64,${product.image}`
                      }
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "150px", // Fixed height for consistency
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        backgroundColor: "#ccc",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Available: {product.quantity}</p>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      style={{
                        padding: "5px",
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>
                    <span style={{ margin: "0 10px" }}>
                      {cartItems[product._id] || 0}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        padding: "5px",
                        backgroundColor:
                          (cartItems[product._id] || 0) >= product.quantity
                            ? "#95a5a6"
                            : "#27ae60",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor:
                          (cartItems[product._id] || 0) >= product.quantity
                            ? "not-allowed"
                            : "pointer",
                      }}
                      disabled={
                        (cartItems[product._id] || 0) >= product.quantity
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>No products found</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default HomePage;
