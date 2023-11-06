import { toast } from "react-toastify";
const url = "https://e-commerce-backend.theweird0ne.repl.co/wishlist";

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
      toast.success("Added to wishlist");
      return data;
    }
  } catch (error) {
    toast.error("Failed to add item");
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
    toast.success("Item removed ");
    return data;
  } catch (error) {
    toast.error("Failed to remove item");
    console.error(error);
  }
};
