"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../context/stateContext'
import { API } from '../../utils/api'
import "./page.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useStateContext()

  const loginBtn = async () => {
    const data = {
      email,
      password
    }

    try {
      const response = await axios.post(API.user.login, data)
      setUser(response.data)
      localStorage.setItem("login", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      console.log("error during login");
    }
  }

  return (
    <div className='loginMain'>
      <h2>LOGIN</h2>
      <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
      <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
      <button onClick={loginBtn}>Login</button>
    </div>
  )
}

export default Login;
