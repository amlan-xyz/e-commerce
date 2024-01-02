import axios from "axios";
import { useState } from "react";
import { FiRotateCcw } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { addNewAddress } from "../../actions/auth.action";
import { confirmOrder } from "../../actions/cart.action";
import { useAuthContext } from "../../contexts/auth.context";
import { useCartContext } from "../../contexts/cart.context";
import { BASE_URL } from "../../utils/baseUrl";
import "./Checkout.css";
export const Checkout = () => {
  const cartContext = useCartContext();
  const cart = cartContext.state.cart;
  const userContext = useAuthContext();
  const allAddress = userContext.state.user.address;
  const [address, setAddress] = useState(allAddress ? allAddress[0] : null);
  const [showAddress, setShowAddress] = useState(false);
  const [form, setForm] = useState([]);
  const navigate = useNavigate();

  const [showMenu, setMenu] = useState(false);

  const deliveryCharge = 49;
  const discount = 10;

  const cartValue =
    cart.reduce((acc, curr) => acc + curr.item.price, 0) +
    deliveryCharge -
    discount;

  const initPay = async (data) => {
    const response = await axios.get(`${BASE_URL}/orders/razorpay-key`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const options = {
      key: response.data.razorpay_key,
      amount: data.amount,
      currency: data.currency,
      name: "Candyland Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      handler: async (res) => {
        try {
          const verifyURL = `${BASE_URL}/orders/verify`;
          const response = await axios.post(
            verifyURL,
            { ...res },
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
          if (response.status === 200) {
            const { razorpay_payment_id, razorpay_order_id } = response.data;
            await confirmOrder({
              razorpay_order_id,
              razorpay_payment_id,
              delivery_address: address,
            });
            cartContext.dispatch({ type: "ORDER_CONFIRMED" });
            navigate("/payment/success");
          } else {
            navigate("/payment/failed");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#89f0b1",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const checkoutHanlder = async () => {
    try {
      const orderURL = "http://localhost:3001/orders/checkout";
      const { data } = await axios.post(
        orderURL,
        { amount: cartValue },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      initPay(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const addAddress = async (e) => {
    e.preventDefault();
    const updatedUser = await addNewAddress(userContext.state.user._id, form);
    userContext.dispatch({ type: "ADD_ADDRESS", payload: updatedUser });
    setShowAddress(!showAddress);
    setAddress({
      house_no: form.house_no,
      city: form.city,
      state: form.state,
      country: form.country,
      pin_code: form.pin_code,
    });
  };

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
        {address ? (
          <>
            <div className="delivery__body">
              <div className="delivery__item" key={address?._id}>
                <p>{address?.house_no}</p>
                <p>
                  {address?.city}, {address?.state}, {address?.country}
                </p>
                <p>Pincode:{address?.pin_code}</p>
              </div>
              <button onClick={() => setMenu(true)} className="link__btn">
                <FiRotateCcw />
              </button>
            </div>
            <button onClick={checkoutHanlder} className="primary__btn">
              Place Order
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="primary__btn"
          >
            Add address
          </button>
        )}
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
      {showAddress && (
        <div className="modal">
          <div className="modal__wrapper"></div>
          <div className="modal__container">
            <div className="address__form-header">
              <h3>Add New Address</h3>
              <button
                className="close__btn"
                onClick={() => setShowAddress(!showAddress)}
              >
                <IoMdClose />
              </button>
            </div>
            <form className="adress__form-body">
              <div className="address__form-item">
                <label htmlFor="house">House No.</label>
                <input
                  type="text"
                  id="house"
                  onChange={(e) => {
                    setForm((form) => ({ ...form, house_no: e.target.value }));
                  }}
                />
              </div>
              <div className="address__form-item">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  onChange={(e) => {
                    setForm((form) => ({ ...form, city: e.target.value }));
                  }}
                />
              </div>
              <div className="address__form-item">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  onChange={(e) => {
                    setForm((form) => ({ ...form, state: e.target.value }));
                  }}
                />
              </div>
              <div className="address__form-item">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  onChange={(e) => {
                    setForm((form) => ({ ...form, country: e.target.value }));
                  }}
                />
              </div>
              <div className="address__form-item">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  onChange={(e) => {
                    setForm((form) => ({ ...form, pin_code: e.target.value }));
                  }}
                />
              </div>
              <div className="address__form-item">
                <button onClick={addAddress} className="submit__btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
