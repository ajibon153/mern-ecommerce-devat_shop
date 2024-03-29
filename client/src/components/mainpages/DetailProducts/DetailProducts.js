import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import ProductItem from '../Products/ProductItem/ProductItem';

export default function DetailProducts() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    console.log('re render');
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <div className='detail'>
        <img src={detailProduct.images.url} alt='' />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>Rp. {detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold : {detailProduct.sold}</p>
          <Link to='/cart' className='cart'>
            Buy Now
          </Link>
        </div>
      </div>
      <div>
        <h2>Related Products</h2>
        <div className='products'>
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
