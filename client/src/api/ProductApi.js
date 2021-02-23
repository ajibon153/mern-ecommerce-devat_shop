import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductApi() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await axios.get('/api/products');
    setProducts(res.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products: [products, setProducts] };
}
