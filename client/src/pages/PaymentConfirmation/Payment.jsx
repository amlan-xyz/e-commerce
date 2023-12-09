import { useNavigate } from "react-router";
import "./Payment.css";

export const PaymentConfirmed = () => {
  const navigate = useNavigate();
  return (
    <div className="div__center">
      <div className="payment__container">
        <img
          className="payment__img"
          src="/images/empty_cart.png"
          alt="A card describing payment success"
        />
        <h2 className="empty__text">Your order is placed</h2>
        <button className="empty__btn" onClick={() => navigate("/shop")}>
          Shop
        </button>
      </div>
    </div>
  );
};

export const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="div__center">
      <div className="payment__container">
        <img
          className="payment__img"
          src="/images/empty_cart.png"
          alt="A card describing payment success"
        />
        <h2 className="payment__text">Your order is placed</h2>
        <button className="payment__btn" onClick={() => navigate("/shop")}>
          Shop
        </button>
      </div>
    </div>
  );
};
