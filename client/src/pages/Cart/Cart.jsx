import { useEffect } from "react";

//context
import { useCartContext } from "../../contexts/cart.context";

//actions
import { fetchCart } from "../../actions/cart.action";

export const Cart=()=>{
    const {state,dispatch}=useCartContext();

    const getCart=async()=>{
        const cart=await fetchCart();
        dispatch({type:"FETCH_CART",payload:cart})
    }

    useEffect(()=>{
        // getCart();
    },[]);


    return(
        <section className="cart__section">
            <h1>Cart page</h1>
            {
                state.cart && state.cart.length()
            }
        </section>
    )
}