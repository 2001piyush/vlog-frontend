import React, { useEffect, useState } from 'react';
import Banner from '../../components/public/Banner';
import ContentGrid from '../../components/public/ContentGrid';
import { getPublicBlocks } from '../../api';
import './HomePage.css'; // Create this new file

function HomePage() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const data = await getPublicBlocks();
                setBlocks(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load content blocks.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchBlocks();
    }, []);

    if (loading) return (
        <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        </div>
    );

    return (
        <div className="home-page transparent-bg">
            <Banner />
            <div className="content-section">
                <div className="container">
                    <h2 className="section-title">Latest Posts</h2>
                    <div className="section-divider"></div>
                    <ContentGrid contentBlocksData={blocks} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;