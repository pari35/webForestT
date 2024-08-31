import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
    const [name,setName] =  useState()
    const [task,setTask] =  useState()

    const navigate = useNavigate()
    const Submit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3001/createTodo",{name,task})
        .then(result => {
            debugger;
            console.log("result",result)
            navigate('/dashboard')
        })
        .catch(err => console.log("err",err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}> 
                    <h2>Add ToDo</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control' 
                       onChange={(e) => setName(e.target.value)}  />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Task</label>
                        <input type='text' placeholder='Enter Task' className='form-control'
                        onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}