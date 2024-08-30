import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Users() {
    const [users, setUsers] = useState([])
useEffect(()=>{
axios.get('http://localhost:3001/dashboard')
.then(result => setUsers(result.data))
.catch(err => console.log(err))
},[])

const handleDelete = (id)=>{
    axios.delete('http://localhost:3001/deleteUser/'+id)
    .then(res=> console.log(res))
    .catch(errr=>console.log(errr))
}
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bh-white rounded p-3">
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>name </th>
                            <th>task </th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr>
                                    <td>{user.name}</td>
                                    <td>{user.task}</td>
                                    <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-success'>Update </Link>
                                        <button className='btn btn-danger'onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}
