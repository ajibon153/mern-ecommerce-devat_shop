import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from './ProductItem/ProductItem';
import Loading from '../../../utils/Loading/Loading';

export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;

  return (
    <>
      <div className='products'>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}
