const backend_api='http://localhost:3001';

export const fetchCart=async()=>{
    const response=await fetch(`${backend_api}/carts`);
    const {data}=await response.json();
    return data;
}