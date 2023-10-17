const url = "http://localhost:3001/wishlist";

export const addToWishlist = async (productId) => {
  try {
    const response = await fetch(`${url}/${productId}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const { data } = await response.json();
    if (response.status === 200) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchWishlist = async () => {
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

export const deleteItemFromWishlist = async (productId) => {
  try {
    const response = await fetch(`${url}/${productId}`, {
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
