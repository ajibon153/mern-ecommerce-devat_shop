import React from 'react';
import BtnRender from './BtnRender';

export default function ProductItem({ product }) {
  return (
    <div className='product_card'>
      <img src={product.images.url} alt='' />
      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>Rp.{product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender product={product} />
    </div>
  );
}
