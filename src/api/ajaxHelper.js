const API_URL = "http://localhost:8080/api/";

export async function registerUser() {
  try {
    const resp = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });

    const json = await resp.json();
    return json.token;
  } catch (err) {
    console.error(err);
  }
}

export async function getUser(token) {
  try {
    const resp = await fetch(`${API_URL}/users`, {
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

export async function fetchAllBitters() {
  try {
    const resp = await fetch(`${API_URL}/bitters`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await resp.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error(err);
  }
}

export const fetchSingleBitter = async () => {
  try {
    const resp = await fetch(`${API_URL}/bitters/${bittersId}`);
    const json = await resp.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
