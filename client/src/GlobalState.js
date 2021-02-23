import React, { createContext, useState } from 'react';
import ProductApi from './api/ProductApi';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  ProductApi();
  const state = {
    token: [token, setToken],
    productsApi: ProductApi(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
