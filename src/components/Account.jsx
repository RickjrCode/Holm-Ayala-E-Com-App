import React, { useState, useEffect } from "react";
import drinkMoreVid from "../assets/more-drinks.mp4";
import { Link } from "react-router-dom";
import { getUser, fetchAllProducts } from "../api/ajaxHelper";

export default function Account({ token }) {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchUserAndProduct = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);

        const productData = await fetchAllProducts("productId");
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching user or product:", error);
      }
    };
    if (token) {
      fetchUserAndProduct();
    }
  }, [token]);

  const isLoggedIn = user && user.token;

  return (
    <div className="account">
      <div className="account-overlay">
        <video src={drinkMoreVid} autoPlay loop muted />
        <div className="account-content">
          {isLoggedIn ? (
            <>
              <h2>Welcome back, {user.username}!</h2>

              {product && (
                <div>
                  <h3>{product.name}</h3>
                  <img src={product.imgUrl} alt={product.name} />
                  <p>In Stock: {product.inStock}</p>
                  <p>Price: {product.price}</p>
                  <button className="btn btn1">Buy Now</button>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>Looks like you don't have an account</h2>
              <Link to="/register">
                <button className="btn btn1">Register Now</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
