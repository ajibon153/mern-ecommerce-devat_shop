import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserApi(token) {
  console.log('token', token);

  const [IsLogged, setIsLogged] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token },
          });
          console.log('res', res);
        } catch (error) {}
      };
      getUser();
    }
  }, [token]);
  return {
    IsLogged: [IsLogged, setIsLogged],
    IsAdmin: [IsAdmin, setIsAdmin],
  };
}

export default UserApi;
