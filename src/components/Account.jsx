import React, { useState, useEffect } from "react";
import drinkMoreVid from "../assets/more-drinks.mp4";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../api/ajaxHelper";
import { useUserContext } from "../userContext";

export default function Account() {
  const { token } = useUserContext();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  const startShoppingHandler = () => {
    // Navigate to the "bitters" route with the user's token
    navigate("/bitters", { state: { username: user.username, token } });
  };

  return (
    <div className="account">
      <div className="account-overlay">
        <video src={drinkMoreVid} autoPlay loop muted />
        <div className="account-content">
          {user && user.token ? (
            <>
              <h2>Welcome back, {user.username}!</h2>
              <button className="btn btn1" onClick={startShoppingHandler}>
                Start Shopping
              </button>
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
