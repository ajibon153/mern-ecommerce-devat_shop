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
    if (user.password.length < 8) {
      alert('Password length too short, minimum 8 character');
    } else {
      try {
        let get = await axios.post('http://localhost:5000/user/register', {
          ...user,
        });
        localStorage.setItem('firstLogin', true);
        window.location.href = '/';
      } catch (error) {
        alert(error.response.data.msg);
      }
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
