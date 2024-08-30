import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function UpdateUser() {
  const {id} = useParams()
  const [name, setName] = useState()
  const [task, setTask] = useState()

  const navigate = useNavigate()
      useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => { console.log(result)
        setName(result.data.name)
        setTask(result.data.task)
        })
        .catch(err => console.log(err))
    },[])

    const Update = (e) =>{
      e.preventDefault()
      useEffect(() => {
        axios.post('http://localhost:3001/updateUser/'+id,{name,task})
        .then(res => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch(err => console.log(err))
    })
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update ToDo</h2>
          <div className='mb-2'>
            <label htmlFor=''>Name</label>
            <input type='text' placeholder='Enter Name' className='form-control' 
            value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Task</label>
            <input type='text' placeholder='Enter Task' className='form-control' 
            value={task} onChange={(e)=> setTask(e.target.value)}/>
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  )
}
