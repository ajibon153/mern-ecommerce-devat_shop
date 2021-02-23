import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [user, setUser] = useState({ email: '', password: '' });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('user get', { ...user });
      let get = await axios.post('http://localhost:5000/user/login', user);
      console.log('get', get);
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
    } catch (error) {
      console.log('error', error.response.data);
      alert(error.response.data.msg);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <input
          type='email'
          name='email'
          required
          placeholder='Email'
          value={user.email}
          onChange={(e) => onChangeInput(e)}
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          autoComplete='on'
          onChange={(e) => onChangeInput(e)}
        />
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
}
