import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Menu from '../../assets/bars-solid.svg';
import Close from '../../assets/shopping-cart-solid.svg';
import Cart from '../../assets/times-solid.svg';

export default function Header() {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className='menu'>
        <img src={Menu} alt='' width='30' />
      </div>
      <div className='logo'>
        <h1>
          <Link to='/'>Jibon Shop</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to='/'>Products</Link>
        </li>
        <li>
          <Link to='/login'>Login & Register</Link>
        </li>
        <li>
          <img src={Close} alt='' width='30' />
        </li>
      </ul>

      <div className='cart-icon'>
        <span>0</span>
        <Link to='/cart'>
          <img src={Cart} alt='' width='30' />
        </Link>
      </div>
    </header>
  );
}
