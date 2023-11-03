import { useEffect } from "react";
import { AiFillStar, AiOutlineDelete } from "react-icons/ai";

//context
import { useCartContext } from "../../contexts/cart.context";

//actions
import {
  fetchCart,
  removeFromCart,
  updateCart,
} from "../../actions/cart.action";

import { addToWishlist } from "../../actions/wishlist.action";

import { useNavigate } from "react-router";
import { useWishlistContenxt } from "../../contexts/wishlist.context";
import "./Cart.css";

export const Cart = () => {
  const { state, dispatch } = useCartContext();
  const wishlistContext = useWishlistContenxt();

  const wishlists = wishlistContext.state.wishlist;

  const navigate = useNavigate();

  const getCart = async () => {
    const cart = await fetchCart();
    dispatch({ type: "FETCH_CART", payload: cart });
  };

  const removeCartItem = async (itemId) => {
    await removeFromCart(itemId);
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  };

  const handleQty = async (itemId, value) => {
    await updateCart(itemId, value);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: itemId, qty: value },
    });
  };

  const moveToWishlist = async (itemId, product) => {
    const item = addToWishlist(product._id);
    dispatch({ type: "ADD_TO_WISHLIST", payload: item });
    removeCartItem(itemId);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="cart__section flex">
      <h1 className="text__center">My Cart ({state.cart.length})</h1>
      <div className="cart__container flex">
        <ul className="cart__items">
          {state.cart &&
            state.cart.map(({ _id, item, quantity }) => {
              return (
                <li className="cart__item flex" key={_id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart__item-img"
                  />

                  <div className="cart__item-body">
                    <div className="cart__item-heading flex">
                      <h3>{item.name}</h3>
                      <button
                        className="delete__btn"
                        onClick={() => removeCartItem(_id)}
                      >
                        <AiOutlineDelete className="delete__icon" />
                      </button>
                    </div>
                    <small>
                      {item.rating} <AiFillStar className="fill__primary" /> |{" "}
                      {item.category}
                    </small>
                    <p>Rs. {item.price}</p>

                    <div className="cart__item-qty">
                      <button
                        disabled={quantity <= 1 ? true : ""}
                        className="cart__item-qty--btn"
                        id={quantity <= 1 ? "disabled" : ""}
                        onClick={() => handleQty(_id, quantity - 1)}
                      >
                        -
                      </button>
                      <p>{quantity}</p>
                      <button
                        className="cart__item-qty--btn"
                        onClick={() => handleQty(_id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    {wishlists.find(({ _id }) => _id === item._id) ? (
                      <button id="disabled" disabled className="submit__btn">
                        Already in Wishlist
                      </button>
                    ) : (
                      <button
                        onClick={() => moveToWishlist(_id, item)}
                        className="submit__btn"
                      >
                        Move to Wishlist
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="cart__details ">
          <div className="cart__details-body flex">
            <h2>Cart Details</h2>
            <hr />
            <ul className="cart__details-items">
              {state.cart.map(({ _id, item, quantity }) => (
                <li key={_id} className="cart__details-item">
                  <p>
                    {" "}
                    <b>
                      {item.name} x{quantity}
                    </b>
                  </p>
                  <p>Rs. {item.price * quantity}</p>
                </li>
              ))}
            </ul>
            <hr />
            <div className="cart__details-item">
              <p>
                <b>Delivery Charge</b>
              </p>
              <p>Rs. 49</p>
            </div>
            <div className="cart__details-item">
              <p>
                <b>Discount</b>
              </p>
              <p>Rs. 10</p>
            </div>
            <hr />
            <div className="cart__details-item">
              <h3>
                <b>Total Price</b>
              </h3>
              <h3>
                Rs.
                {state.cart.reduce(
                  (acc, curr) => acc + curr.quantity * curr.item.price,
                  0
                ) + 39}
              </h3>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="submit__btn"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
