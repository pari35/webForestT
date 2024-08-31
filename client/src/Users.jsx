import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/dashboard/')
            .then(result => {
                console.log("Fetched users:", result.data); // Log fetched data
                setUsers(result.data);
            })
            .catch(err => {
                console.error("Error fetching users:", err); // Log error details
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log("Delete response:", res); // Log response from delete request
                // Optionally, you might want to refetch users or remove the deleted user from state
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => {
                console.error("Error deleting user:", err); // Log error details
            });
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Task</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.task}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success me-2'>Update</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
