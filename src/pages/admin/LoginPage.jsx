import React, { useState } from 'react';
import { adminLogin } from '../../api';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await adminLogin(username, password);
            setIsAuthenticated(true);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Login failed. Invalid credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        // Use Bootstrap container and spacing utilities
        <div className="container mt-5">
            <div className="row justify-content-center"> {/* Center the column */}
                <div className="col-md-6 col-lg-4"> {/* Responsive column width */}
                    <div className="card shadow-lg"> {/* Bootstrap Card with shadow */}
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Admin Login</h2> {/* Bootstrap card title, text-center, margin-bottom */}
                            {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Bootstrap alert for error */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3"> {/* Bootstrap margin-bottom */}
                                    <label htmlFor="username" className="form-label">Username:</label> {/* Bootstrap form label */}
                                    <input
                                        type="text"
                                        className="form-control" // Bootstrap form control
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3"> {/* Bootstrap margin-bottom */}
                                    <label htmlFor="password" className="form-label">Password:</label> {/* Bootstrap form label */}
                                    <input
                                        type="password"
                                        className="form-control" // Bootstrap form control
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100"> {/* Bootstrap primary button, full width */}
                                    Login
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