const url = "https://e-commerce-backend.theweird0ne.repl.co/carts";

export const fetchCart = async () => {
  try {
    const response = await fetch(`${url}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (productId) => {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${url}/${itemId}`, {
      method: "DELETE",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (itemId, value) => {
  try {
    const response = await fetch(`${url}/${itemId}/update-quantity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ qty: value }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
