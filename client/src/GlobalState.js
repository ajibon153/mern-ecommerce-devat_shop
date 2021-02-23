import React, { createContext, useState, useEffect } from 'react';
import ProductApi from './api/ProductApi';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshToken = async () => {
    console.log('refresg call');

    const get = await axios.get('http://localhost:5000/user/refresh_token');
    console.log('refresh', get);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsApi: ProductApi(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
