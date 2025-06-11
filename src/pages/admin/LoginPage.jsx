import React, { useState } from 'react';
import { adminLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import { userLogin } from "../../api";
function LoginPage({ setIsAuthenticated , setIsAdmin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [ifAdmin, setIfAdmin] = useState(true); // Toggle state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (ifAdmin) {
                await adminLogin(username, password);
                setIsAuthenticated(true);
                setIsAdmin(true);
                navigate('/admin/dashboard');
            } else {
                 await userLogin(username, password); // Call your user login API
                 setIsAuthenticated(true);
                 setIsAdmin(false);
            navigate('/'); // Navigate to home page on successful user login

            }
        } catch (err) {
            setError('Login failed. Invalid credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="card-title text-center mb-0">
                                    {ifAdmin ? 'Admin Login' : 'User Login'}
                                </h2>
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => setIfAdmin((prev) => !prev)}
                                >
                                    {ifAdmin ? 'Switch to User' : 'Switch to Admin'}
                                </button>
                            </div>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        {ifAdmin ? 'Admin Username:' : 'Email:'}
                                    </label>
                                    <input
                                        type={ifAdmin ? 'text' : 'email'}
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    {ifAdmin ? 'Login as Admin' : 'Login as User'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;