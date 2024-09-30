import React, { useState, useEffect, useRef } from "react";
import axios from "../axiosInstance";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const menuRef = useRef(null);

  // Fetch categories and products for normal users
  const fetchCategoriesAndProducts = async () => {
    try {
      const categoriesResponse = await axios.get("/api/user/categories");
      const productsResponse = await axios.get("/api/user/products");

      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

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

  // Handle cart updates
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [product._id]: prevItems[product._id] ? prevItems[product._id] + 1 : 1,
    }));
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (updatedItems[product._id] > 1) {
        updatedItems[product._id] -= 1;
      } else {
        delete updatedItems[product._id]; // Remove the item from the cart if count reaches 0
      }

      return updatedItems;
    });
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
          <FaShoppingCart size={25} style={{ cursor: "pointer" }} />
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
            <li style={{ margin: "10px 0" }}>Orders</li>
            <li style={{ margin: "10px 0" }}>Profile</li>
            <li style={{ margin: "10px 0" }}>Settings</li>
            <li style={{ margin: "10px 0" }}>Logout</li>
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
              minWidth: "200px", // Adjusted to give more width
              textAlign: "center",
              cursor: "pointer",
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
                  width: "100%", // Full width of the container
                  height: "150px", // Set a larger height
                  objectFit: "cover", // Ensures the image covers the area without distortion
                  borderRadius: "8px", // Keeps the border-radius for a smooth look
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
                {/* Fallback content if no image */}
                No Image
              </div>
            )}
            <div>{category.name}</div>
          </div>
        ))}
      </div>

      {/* Products Section - Grid Layout */}
      <h2 style={{ marginTop: "20px" }}>Products</h2>
      {filteredProducts.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "20px",
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
              }}
            >
              <img
                src={
                  product.image && product.image.startsWith("data:image")
                    ? product.image
                    : `data:image/jpeg;base64,${product.image}`
                }
                alt={product.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />

              <h3>{product.name}</h3>
              <p>${product.price}</p>
              {cartItems[product._id] ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2ecc71",
                      color: "white",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#3498db",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default HomePage;
