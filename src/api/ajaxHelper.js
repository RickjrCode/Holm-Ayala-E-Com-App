const API_URL = "https://localhost:5432/bitters-and-shrubs";

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

export async function loginUser() {
  try {
    const resp = await fetch(`${API_URL}/users/login`, {
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

export async function fetchAllBitters() {
  try {
    const resp = await fetch(`${API_URL}/api/bitters`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await resp.json();
    console.log(json);
    return json.bitters;
  } catch (err) {
    console.error(err);
  }
}

export const fetchSingleBitter = async () => {
  try {
    const resp = await fetch(`${API_URL}/bitters/${bittersId}`);
    const json = await resp.json();
    return json.bitters;
  } catch (err) {
    console.error(err);
  }
};
