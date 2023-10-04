const backend_api='http://localhost:3001';

export const fetchProducts=async()=>{
    const response=await fetch(`${backend_api}/products`);
    const {data}=await response.json();
    return data;
}
