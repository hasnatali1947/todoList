"use client"

import axios from 'axios'
import React, { useState } from 'react'
import { API } from '../../utils/api'
import "./page.css"

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")

    const signupBtn = async () => {
        const data = {
            name,
            email,
            password,
            Cpassword
        }

        if (password !== Cpassword) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(API.user.signup, data)
            console.log(response);
        } catch (error) {
            console.error(error);
            console.log("error during signup");
        }
    }

    return (
        <div className='signupMain'>
            <h2>SIGNUP</h2>
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='name' />
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
            <input value={Cpassword} onChange={(e) => { setCpassword(e.target.value) }} type="password" placeholder='C password' />
            <button onClick={signupBtn}>Signup</button>
        </div>
    )
}

export default Signup
