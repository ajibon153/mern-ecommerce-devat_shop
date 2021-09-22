import React, { createContext, useState, useEffect } from 'react';
import ProductApi from './api/ProductApi';
import UserApi from './api/UserApi';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshToken = async () => {
    console.log('refreshToken');
    const get = await axios.get('http://localhost:5000/user/refresh_token', {
      withCredentials: true,
    });
    console.log('get', get);
    setToken(get.data.accesstoken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    console.log('firstLogin', firstLogin);
    if (firstLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsApi: ProductApi(),
    userApi: UserApi(token),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
