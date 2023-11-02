import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router";
//actions
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
      <section className="home__categories flex">
        <h2 className="text__center">Our Categories</h2>
        <p>Select from our awesome collection of different items</p>
        <ul className="home__categories-list flex">
          <li
            onClick={() => {
              navigate("/shop/#candies");
            }}
            className="home__categories-item"
          >
            <img
              className="home__categories-img"
              src="/candies/lollipop/lolipop.jpg"
              alt="candy cane"
            />
            <h3 className="text__center">Candies</h3>
          </li>
          <li
            onClick={() => {
              navigate("/shop/#doughnuts");
            }}
            className="home__categories-item"
          >
            <img
              className="home__categories-img"
              src="/candies/doughnuts/cream.jpg"
              alt="doughnut"
            />
            <h3 className="text__center">Doughnuts</h3>
          </li>
          <li
            onClick={() => {
              navigate("/shop/#cupcakes");
            }}
            className="home__categories-item"
          >
            <img
              className="home__categories-img"
              src="/candies/cupcakes/fruity.jpg"
              alt="cupcake"
            />
            <h3 className="text__center">Cupcakes</h3>
          </li>
        </ul>
      </section>
    </div>
  );
};
