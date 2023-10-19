const backend_api = "https://e-commerce-backend.theweird0ne.repl.co";

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
