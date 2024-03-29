import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../actions/products.action";
import "./TopProducts.css";
export const TopProducts = () => {
  const navigate = useNavigate();

  const [top3Products, setTop3Products] = useState([]);

  const topProducts = async () => {
    const products = await fetchProducts();
    const sortedProducts = products?.sort((a, b) => b.rating - a.rating);
    setTop3Products(sortedProducts?.slice(0, 3));
  };

  useEffect(() => {
    topProducts();
  }, [top3Products]);

  return (
    <section className="home__categories flex">
      <h1 className="text__center">Our Best Products</h1>
      <p>Select from our collection of best items</p>
      <ul className="home__categories-list flex">
        {top3Products.map((item) => (
          <li
            key={item._id}
            className="home__categories-item"
            onClick={() => navigate(`/products/${item._id}`)}
          >
            <img
              className="home__categories-img"
              src={item.image}
              alt={item.name}
            />
            <h3 className="text__center">{item.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};
