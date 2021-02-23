import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from './Products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './Cart/Cart';
import DetailProducts from './DetailProducts/DetailProducts';
import NotFound from '../../utils/NotFound/NotFound';

export default function Pages() {
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/detail/:id' exact component={DetailProducts} />
    </Switch>
  );
}
