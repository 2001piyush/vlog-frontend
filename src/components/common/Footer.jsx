import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer text-center text-lg-start mt-auto">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase text-white">My Vlog</h5>
                        <p className="text-white">
                            A place for thoughts, adventures, and stories. Thanks for visiting!
                        </p>
                    </div>

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase text-white">Connect With Us</h5>
                        <ul className="list-unstyled d-flex justify-content-center justify-content-lg-end">
                            <li className="me-5">
                                <a 
                                    href="https://www.instagram.com/trading_mentos" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white social-icon"
                                >
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                </a>
                            </li>
                            <li className="me-5">
                                <a 
                                    href="https://www.youtube.com/@market_mentos01" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-white social-icon"
                                >
                                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 bg-dark text-white">
                  Exploring the world, one post at a time. - My Vlog ©{new Date().getFullYear()}.
            </div>
        </footer>
    );
}

export default Footer;