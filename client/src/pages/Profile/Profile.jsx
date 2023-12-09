import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { addNewAddress, removeAddress } from "../../actions/auth.action";
import { useAuthContext } from "../../contexts/auth.context";
import { BASE_URL } from "../../utils/baseUrl";
import "./Profile.css";
export const Profile = () => {
  const { state, dispatch } = useAuthContext();
  const [addressForm, setAddressForm] = useState(false);
  const [form, setForm] = useState([]);
  const [orders, setOrders] = useState([]);
  const user = state.user;

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    state.isLoggedIn = false;
    state.user = null;
    navigate("/");
  };

  const addAddress = async (e) => {
    e.preventDefault();
    const updatedUser = await addNewAddress(user._id, form);
    dispatch({ type: "ADD_ADDRESS", payload: updatedUser });
    setAddressForm(!addressForm);
  };

  const handleDeleteAddress = async (addressId) => {
    const updatedUser = await removeAddress(user._id, addressId);
    dispatch({ type: "REMOVE_ADDRESS", payload: updatedUser });
  };

  const getOrders = async () => {
    const {
      data: { orders },
    } = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    setOrders(orders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="profile__container">
      <h1 className="text__center">Profile</h1>
      <div className="profile__body">
        <p>
          <b>Name:</b> <br /> {user?.name}
        </p>
        <p>
          <b>Username:</b> <br /> {user?.username}
        </p>
        <p>
          {" "}
          <b>Email:</b> <br /> {user?.email}
        </p>
        <p>
          {" "}
          <b>Phone Number:</b> <br /> {user?.phoneNumber}
        </p>
        <p className="address__container">
          <b>Address:</b>{" "}
          <button onClick={() => setAddressForm(!addressForm)}>
            <IoMdAdd />
          </button>
        </p>
        <ul className="address__list">
          <hr />
          {user?.address?.map((item) => (
            <>
              <li className="address__item" key={item._id}>
                <p>
                  {item.house_no} <br /> {item.city}, {item.state}{" "}
                  {item.country}, PIN:
                  {item.pin_code}
                </p>
                <button
                  className="delete__btn"
                  onClick={() => handleDeleteAddress(item._id)}
                >
                  <MdDelete />
                </button>
              </li>
              <hr />
            </>
          ))}
        </ul>
        <p>
          {" "}
          <b>Orders</b>
        </p>
        {orders.length !== 0 ? (
          <ul className="address__list">
            {orders?.map((order) => (
              <>
                <hr />
                <li className="address__item" key={order._id}>
                  <p>
                    {order.order_item} x {order.order_quantity}
                  </p>
                  <p>Rs. {order.order_value}</p>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <p>No orders found</p>
        )}
        <button onClick={handleLogout} className="primary__btn">
          Logout
        </button>
      </div>
      {addressForm && (
        <div className="modal">
          <div className="modal__wrapper"></div>
          <div className="modal__container">
            <div className="address__form-header">
              <h3>Add New Address</h3>
              <button
                className="close__btn"
                onClick={() => setAddressForm(!addressForm)}
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
