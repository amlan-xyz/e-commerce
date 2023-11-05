import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router";
//actions

import { TopProducts } from "../../components/Top3Products.jsx/TopProducts";
import "./Home.css";
export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero flex">
        <img src="candies/banner/candyjar.jpg" alt="" className="hero__img" />
        <div className="hero__content">
          <h2>100% Original</h2>
          <p>Fresh Candies, Cupcakes & Doughnuts</p>
          <button className="hero__btn flex" onClick={() => navigate("/shop")}>
            Shop <AiOutlineShopping className="fill__primary" />
          </button>
        </div>
      </section>
      <TopProducts />
    </div>
  );
};
