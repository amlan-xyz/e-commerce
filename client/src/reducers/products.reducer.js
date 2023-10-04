export const productsReducer=(state,action)=>{
    switch(action.type){
        case "FETCH_PRODUCTS":
            return{
                ...state,
                products:action.payload,
                filteredProducts:action.payload
            }
        default:
            return state;
    }
}