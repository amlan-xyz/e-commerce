import { useNavigate } from "react-router";
import "./Empty.css";
export const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <img
        className="empty__img"
        src="/images/empty_cart.png"
        alt="Empty cart"
      />
      <h2 className="empty__text">Hey, your cart is empty!</h2>
      <button className="empty__btn" onClick={() => navigate("/shop")}>
        Shop
      </button>
    </div>
  );
};

export const EmptyWishlist = () => {
  const navigate = useNavigate();
  return (
    <div className="empty">
      <img
        className="empty__img"
        src="/images/empty_wishlist.png"
        alt="Empty wishlist"
      />
      <h2 className="empty__text">Hey, your wishlist is empty</h2>
      <button className="empty__btn" onClick={() => navigate("/shop")}>
        Shop
      </button>
    </div>
  );
};

export const EmptyProducts = () => {
  return (
    <div className="empty">
      <img
        className="empty__img"
        src="/images/no_products.png"
        alt="No products found"
      />
      <h2 className="empty__text">No products found</h2>
    </div>
  );
};
