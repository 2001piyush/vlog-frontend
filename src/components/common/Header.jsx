import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../api';
import './Header.css';


// Assuming you are using Bootstrap classes

function Header({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await adminLogout();
            setIsAuthenticated(false);
            navigate('/'); // Redirect to the homepage after successful logout
        } catch (error) {
            console.error('Logout failed:', error);
            alert('Logout failed!'); // Basic error feedback
        }
    };

    // Function to handle clicking the "Home" action when authenticated
    const handleHomeClickWhenAuthenticated = (e) => {
        e.preventDefault(); // Prevent the default Link behavior
        handleLogout(); // Trigger the logout process
    };


    return (
        // Use Bootstrap Navbar classes
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
            <div className="container-fluid">
                {/* Always link the brand/logo to the homepage */}
                <Link className="navbar-brand" to="/"><b>Trading Mentor</b></Link>

                {/* Toggler for mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* ms-auto pushes items to the right */}

                        {/* Conditional Home link/action */}
                        {isAuthenticated ? (
                            // If authenticated, "Home" link triggers logout
                             <li className="nav-item me-3">
                                {/* Use a button styled as a nav-link */}
                                 <button
                                     className="nav-link btn btn-link"
                                     onClick={handleHomeClickWhenAuthenticated} // Call our new handler
                                 >
                                     Home
                                 </button>
                             </li>
                        ) : (
                            // If not authenticated, "Home" is a standard Link
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                        )}

                        <li className="nav-item me-3">
                             <Link className="nav-link" to="/about">About</Link>
                        </li>

                        {/* Admin/Logout links (only show if authenticated) */}
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item, me-3">
                                    <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                                 <li className="nav-item me-3">
                                     <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                 </li>
                            </>
                        ) : (
                             // Admin Login link (only show if NOT authenticated)
                            <li className="nav-item me-3">
                                <Link className="nav-link" to="/admin/login">Admin Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;