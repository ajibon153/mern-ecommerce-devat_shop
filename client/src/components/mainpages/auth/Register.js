import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('user', user);
      let get = await axios.post('/user/register', { ...user });
      console.log('get', get);
      localStorage.setItem('firstLogin', true);
      // window.location.href = '/';
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <input
          type='text'
          name='name'
          required
          placeholder='Name'
          value={user.name}
          onChange={(e) => onChangeInput(e)}
        />
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
          <button type='submit'>Register</button>
          <Link to='/register'>Login</Link>
        </div>
      </form>
    </div>
  );
}
