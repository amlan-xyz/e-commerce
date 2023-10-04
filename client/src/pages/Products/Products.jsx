import { useEffect } from "react"


//context
import { useProductsContext } from "../../contexts/products.context"

//actions
import {fetchProducts} from '../../actions/products.actions'

export const Products=()=>{

    const {state,dispatch}=useProductsContext();

    const getProducts=async()=>{
        const products=await fetchProducts();
        dispatch({type:"FETCH_PRODUCTS",payload:products});
    }

    useEffect(()=>{
        getProducts();
    },[]);
    
    return(
        <section className="products__section">
            <h1>Products page</h1>
            <ul>
                {
                    state.filteredProducts.map(product=>{
                        const {_id,name}=product;
                        return(
                            <li key={_id}>
                                {name}
                            </li>
                        )
                    })
                }
            </ul>
        </section>
        
    )
}