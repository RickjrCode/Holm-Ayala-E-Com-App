const API_URL = "https://bitter-days-be.onrender.com/api";
import axios from "axios";

export async function registerUser(userObj) {
  try {
    const resp = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const json = await resp.json();
    console.log(json.token);
    return json.token;
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(token) {
  try {
    const resp = await fetch(`${API_URL}/users/account`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await resp.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(userObj) {
  try {
    const resp = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const json = await resp.json();
    return json.token;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchAllProducts() {
  try {
    const resp = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const products = await resp.json();
    console.log(products);
    return products;
  } catch (err) {
    console.error(err);
  }
}

export const fetchSingleProduct = async () => {
  try {
    const resp = await fetch(`${API_URL}/products/${productsId}`);
    const products = await resp.json();
    return products;
  } catch (err) {
    console.error(err);
  }
};

export const getCart = async (userId) => {
  try {
    const resp = await axios.get(`${API_URL}/orders/user/${userId}`);
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};
