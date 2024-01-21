import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate } from "react-router-dom";
import "../Bitters.css";

export default function Shrubs() {
  const [shrubs, setShrubs] = useState([]);
  const [searchShrubs, setSearchShrubs] = useState("");
  const [storedShrubs, setStoredShrubs] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const filteredShrubs = storedShrubs
    .filter((product) => {
      return product.name.toLowerCase().includes(searchShrubs.toLowerCase());
    })
    .filter((product) => product.type === "shrubs");

  async function getShrubs() {
    try {
      const allShrubs = await fetchAllProducts();
      setShrubs(allShrubs);
      setStoredShrubs(allShrubs);

      const initialShowDescription = allShrubs.reduce(
        (acc, product) => ({ ...acc, [product.id]: false }),
        {}
      );
      setShowDescription(initialShowDescription);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getShrubs();
  }, []);

  const toggleDescription = (productId) => {
    setShowDescription((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleCheckOut = () => {
    if (token) {
      console.log("Perform check out action");
    } else {
      navigate("/account");
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Shrubs"
            value={searchShrubs}
            onChange={(e) => {
              setSearchShrubs(e.target.value.toLowerCase());
            }}
          />
        </div>

        <div className="bitters-name">
          <h2>Our Shrubs</h2>
        </div>
        <div className="bitters-container">
          {filteredShrubs.map((product) => (
            <div className="bitters-card" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imgUrl} alt={product.name} />
              <button
                className="btn btn1"
                onClick={() => toggleDescription(product.id)}
              >
                Details
              </button>
              {showDescription[product.id] && (
                <>
                  <p className="product-description">{product.description}</p>
                  <button className="btn btn1" onClick={handleCheckOut}>
                    {token ? "Proceed to Checkout" : "Check Out"}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="bottom-center">
          <button className="btn btn1" onClick={() => navigate("/bitters")}>
            Go to Bitters
          </button>
        </div>
      </div>
    </>
  );
}
