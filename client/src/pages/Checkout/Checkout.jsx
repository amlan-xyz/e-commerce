import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useCartContext } from "../../contexts/cart.context";
import "./Checkout.css";

export const Checkout = () => {
  const cartContext = useCartContext();
  const cart = cartContext.state.cart;

  const [address, setAddress] = useState([
    {
      _id: uuid(),
      address: "123 Main City",
      landmark: "Near City Hall",
      pinCode: 980988,
      city: "West Side of Sea",
    },
  ]);

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
        <ul className="delivery__body">
          {" "}
          {address.map(({ _id, address, landmark, pinCode, city }) => (
            <li key={_id}>
              <p>
                {address}, {landmark}
              </p>
              <p>Pincode:{pinCode}</p>
              <p>{city}</p>
            </li>
          ))}
        </ul>
        <button className="primary__btn">Place Order</button>
      </div>
    </div>
  );
};