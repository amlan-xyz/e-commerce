import { BASE_URL } from "../utils/baseUrl";

const backend_api = `${BASE_URL}`;

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${backend_api}/products`);
    const { data } = await response.json();
    if (response.status === 200) {
      return data;
    } else if (response.status === 404) {
      throw new Error("Cannot find products");
    }
  } catch (error) {
    console.error(error);
  }
};
