import React from 'react'
import './Main.css';

const Register = () => {
  return (
    <div className='register_container'>
        <h1>Register</h1>
        <br/>
        <br/>
        <input type='text' placeholder='name'/>
        <br/>
        <br/>
        <input type='email' placeholder='email'/>
        <br/>
        <br/>
        <input type='password' placeholder='password'/>
    </div>
  )
}

export default Register;