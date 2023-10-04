import { createContext,useContext,useReducer } from "react";

//reducer
import {productsReducer} from '../reducers/products.reducer'

const ProductsContext=createContext();

const initialState={
    products:[],
    filteredProducts:[],
    searchQuery:"",
    sortHighToLow:null,
    priceRange:0,
    rating:0,
};

export const ProductsProvider=({children})=>{
    const [state,dispatch]=useReducer(productsReducer,initialState);

    return(
        <ProductsContext.Provider value={{state,dispatch}}>{children}</ProductsContext.Provider>
    )
}

export const useProductsContext=()=>{
    return useContext(ProductsContext);
}