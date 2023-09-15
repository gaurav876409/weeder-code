import React, {useState} from 'react'
import './Main.css';

const Main = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
  return (
    <div className='login_container'>
        <h1>Login Page</h1>
        <br/>
        <br/>
        <input type='email' placeholder='email'/>
        <br/>
        <br/>
        <input type='password' placeholder='password'/>
        <br/>
        <br/>
        <button>Login</button>
    </div>
  )
}

export default Main;