import { useEffect } from "react";

//context
import { useCartContext } from "../../contexts/cart.context";

//actions
import {
  fetchCart,
  removeFromCart,
  updateCart,
} from "../../actions/cart.action";

export const Cart = () => {
  const { state, dispatch } = useCartContext();

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

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="cart__section">
      <h1>Cart page</h1>
      {state.cart &&
        state.cart.map(({ _id, item, quantity }) => {
          return (
            <li key={_id}>
              {item.name} ||{" "}
              <button onClick={() => removeCartItem(_id)}>Remove</button>
              <button onClick={() => handleQty(_id, quantity - 1)}>-</button> ||
              Quantity:{quantity} ||{" "}
              <button onClick={() => handleQty(_id, quantity + 1)}>+</button>
            </li>
          );
        })}
    </section>
  );
};
