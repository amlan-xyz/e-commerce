import { useEffect } from "react";

//context
import { useProductsContext } from "../../contexts/products.context";

//actions
import { fetchProducts } from "../../actions/products.action";

//components
import { Product } from "../../components/Product/Product";
import "./Products.css";

export const Products = () => {
  const { state, dispatch } = useProductsContext();

  const getProducts = async () => {
    const products = await fetchProducts();
    dispatch({ type: "FETCH_PRODUCTS", payload: products });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="products__section">
      <h2 className="text__center">Pick your candies</h2>
      {/* <Sidebar /> */}
      <ul className="products__list flex">
        {state.filteredProducts.map((product) => (
          <li key={product._id} className="products__list-item">
            <Product {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
