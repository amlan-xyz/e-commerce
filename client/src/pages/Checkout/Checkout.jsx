import { useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAuthContext } from "../../contexts/auth.context";
import { useCartContext } from "../../contexts/cart.context";
import "./Checkout.css";
export const Checkout = () => {
  const cartContext = useCartContext();
  const cart = cartContext.state.cart;
  const userContext = useAuthContext();
  const allAddress = userContext.state.user.address;
  const [address, setAddress] = useState(allAddress ? allAddress[0] : null);
  const [showMenu, setMenu] = useState(false);

  return (
    <div className="checkout__container">
      <h1 className="text__center">Checkout</h1>
      <div className="checkout__body">
        <h3>Order Details</h3>
        <hr />
        <ul className="checkout__list">
          {cart &&
            cart.map(({ _id, item, quantity }) => (
              <li className="checkout__item" key={_id}>
                <p>
                  <b>
                    {item.name} x {quantity}
                  </b>
                </p>
                <p>Rs. {item.price * quantity}</p>
              </li>
            ))}
        </ul>
        <hr />
        <h3>Price Details</h3>
        <hr />
        <div className="checkout__item">
          <p>
            <b>Delivery Charge</b>
          </p>
          <p>Rs. 49</p>
        </div>
        <div className="checkout__item">
          <p>
            <b>Discount</b>
          </p>
          <p>- Rs. 10</p>
        </div>
        <div className="checkout__item">
          <p>
            <b>Total Price</b>
          </p>
          <p>
            Rs{" "}
            {cart &&
              cart.reduce(
                (total, cartItem) =>
                  total + cartItem.item.price * cartItem.quantity,
                0
              ) + 39}
          </p>
        </div>
        <hr />
        <h3>Deliver To</h3>
        <hr />
        <div className="delivery__body">
          <div className="delivery__item" key={address._id}>
            <p>{address.house_no}</p>
            <p>
              {address.city}, {address.state}, {address.country}
            </p>
            <p>Pincode:{address.pin_code}</p>
          </div>
          <button onClick={() => setMenu(true)} className="link__btn">
            <FiRotateCcw />
          </button>
        </div>
        <button className="primary__btn">Place Order</button>
      </div>
      {showMenu && (
        <div className="modal">
          <div className="modal__wrapper"></div>
          <div className="modal__container">
            <div className="address__menu-header">
              <h3>Select Address</h3>
              <button className="close__btn" onClick={() => setMenu(!showMenu)}>
                <IoMdClose />
              </button>
            </div>
            <hr />
            <ul className="menu__list">
              {allAddress?.map((item) => {
                const { house_no, city, state, country, pin_code } = item;
                return (
                  <>
                    <li className="menu__item">
                      <label htmlFor="address">
                        <p>{house_no}</p>
                        <p>
                          {city}, {state}, {country}
                        </p>
                        <p>Pincode:{pin_code}</p>
                      </label>
                      <input
                        type="radio"
                        onChange={() => {
                          setAddress(item);
                          setMenu(!showMenu);
                        }}
                      />
                    </li>
                    <hr />
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
