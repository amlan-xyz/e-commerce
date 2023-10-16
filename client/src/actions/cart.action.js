const url = "http://localhost:3001/carts";

export const fetchCart = async () => {
  const response = await fetch(`${url}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const { data } = await response.json();
  return data;
};

export const addToCart = async (productId) => {
  const response = await fetch(`${url}/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  });
  const { data } = await response.json();
  return data;
};

export const removeFromCart = async (itemId) => {
  const response = await fetch(`${url}/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const { data } = await response.json();
  return data;
};

export const updateCart = async (itemId, value) => {
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
};
