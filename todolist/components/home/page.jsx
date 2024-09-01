"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../context/stateContext'
import { API } from '../../utils/api'
import GetData from '../getData/page'
import "./page.css"

const Home = () => {

  const [item, setItem] = useState("")
  const [description, setDescription] = useState("")
  const [listData, setListData] = useState(null)
  const { user, setUser } = useStateContext()

  const submit = async () => {
    const token = user?.token
    if (!token) {
      console.error("Token is missing");
      return;
    }
    try {
      const response = await axios.put(API.user.todoUpdate,
        {
          item,
          description,
          email: user?.response.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUser((prev) => ({ ...prev, ...response.data }))

    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
    localStorage.removeItem("login")
    setUser(null)
  }

  return (
    <div className='homeMain'>
      <button onClick={logout}>logout</button>
      TODO LIST
      <input value={item} onChange={(e) => { setItem(e.target.value) }} type="text" placeholder='Item' />
      <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" placeholder='Description' />
      <button onClick={submit}>SUBMIT</button>

      <GetData user={user} setUser={setUser} listData={listData} setListData={setListData} />
    </div>

  )
}

export default Home
