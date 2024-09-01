"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../utils/api'
import "./page.css"

const GetData = ({ user, listData, setListData }) => {

    const [editIndex, setEditIndex] = useState(null)
    const [editItem, setEditItem] = useState()
    const [editDescription, setEditDescription] = useState()

    const getUser = async () => {
        const userId = user?.userId
        const token = user?.token;

        if (!token) {
            console.error("Token is missing");
            return;
        }

        if (!userId) {
            console.error("userId is missing");
            return;
        }

        try {
            const response = await axios.get(`${API.user.getUser}?userId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                } 
            );
            setListData(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user && user.token) {
            getUser();
        }
    }, [user]);

    const deleteItems = async (index) => {
        const todoId = listData?.todoData[index]?._id;
        const token = user?.token

        try {
            const response = await axios.post(API.user.deleteItem,
                {
                    userId: user.userId,
                    todoId: todoId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                const updatedTodoData = listData.todoData.filter((_, i) => i !== index);
                setListData({ ...listData, todoData: updatedTodoData });
            }
        } catch (error) {
            console.error("Error deleting item", error);
        }
    }

    const handleEdit = (index) => {
        setEditIndex(index)
        setEditDescription(listData.todoData[index].description)
        setEditItem(listData.todoData[index].edit)
    }

    const handleSave = async (index) => {

        const item = editItem
        const description = editDescription
        const userId = user?.userId
        const todoId = listData?.todoData[index]?._id;
        const token = user?.token

        const res = await axios.put(API.user.editItem, { item, description, userId, todoId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (res.data.success) {
            const updateTodoData = listData.todoData.map((todo, i) =>
                i === index ? { ...todo, item: editItem, description: editDescription } : todo
            )
            setListData({ ...listData, todoData: updateTodoData })
            setEditIndex(null)
        }
    }

    return (
        <div className='todoDataMain'>
            {listData?.todoData?.length > 0 ? (
                listData.todoData.map((todo, index) => (
                    <div className='todoDataDiv' key={index}>
                        {editIndex === index ?
                            <div>
                                <input type="text" placeholder='item edit' onChange={(e) => setEditItem(e.target.value)} />
                                <input type="text" placeholder='description edit' onChange={(e) => setEditDescription(e.target.value)} />
                            </div>
                            :
                            <div>
                                <span>{todo.item}</span>
                                <p>{todo.description}</p>
                            </div>
                        }
                        <div>
                            {editIndex === index ?
                                <button onClick={() => handleSave(index)}>Save</button>
                                :
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            }

                            <button onClick={() => deleteItems(index)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No todo data available</p>
            )}
        </div>
    )
}

export default GetData
