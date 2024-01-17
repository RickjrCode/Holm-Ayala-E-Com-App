import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/ajaxHelper";
import { useNavigate } from "react-router-dom";
import "../Bitters.css";

export default function Bitters() {
  const [bitters, setBitters] = useState([]);
  const [searchBitters, setSearchBitters] = useState("");
  const [storedBitters, setStoredBitters] = useState([]);
  const navigate = useNavigate();

  const filteredBitters = storedBitters
    .filter((product) => {
      return product.name.toLowerCase().includes(searchBitters.toLowerCase());
    })
    .filter((product) => product.type === "bitters");

  async function getBitters() {
    try {
      const allBitters = await fetchAllProducts();
      setBitters(allBitters);
      setStoredBitters(allBitters);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBitters();
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search our Bitters"
            value={searchBitters}
            onChange={(e) => {
              setSearchBitters(e.target.value.toLowerCase());
            }}
          />
        </div>

        <div className="bitters-name">
          <h2>Our Bitters</h2>
        </div>
        <div className="bitters-container">
          {filteredBitters.map((product) => (
            <div className="bitters-card" key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imgUrl} alt={product.name} />
              <button
                className="btn btn1"
                onClick={() => navigate(`/account/${product.id}`)}
              >
                Details
              </button>
            </div>
          ))}
        </div>
        <div className="bottom-center">
          <button className="btn btn1" onClick={() => navigate("/shrubs")}>
            Go to Shrubs
          </button>
        </div>
      </div>
    </>
  );
}
