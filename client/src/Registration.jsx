import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = () => {
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register/', { name, email, password })
            .then(res => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="login-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p className="mt-3">Already Have an Account?</p>
                <button
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                    onClick={handleChange}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Registration;
