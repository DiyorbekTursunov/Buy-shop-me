const FullDetailService = {
    async getFullDetail (id:any){ 
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        return data
    }
}
export default FullDetailService