import { useState } from "react";
import { useParams } from "react-router";
import { v4 as uuid } from "uuid";
import { useProductsContext } from "../../contexts/products.context";

export const BuyNow = () => {
  const { id } = useParams();
  const { state } = useProductsContext();

  const product = state.products?.find(({ _id }) => _id === id);

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

        <div className="checkout__item" key={product._id}>
          <p>
            <b>{product.name} x 1</b>
          </p>
          <p>Rs. {product.price * 1}</p>
        </div>

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
          <p>Rs {product.price + 39}</p>
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
