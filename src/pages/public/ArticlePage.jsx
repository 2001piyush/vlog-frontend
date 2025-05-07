import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPublicBlockById } from '../../api';
import './ArticlePage.css';

function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getPublicBlockById(id);
                setArticle(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load article.');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return (
        <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    if (!article) return <div>Article not found</div>;

   // ...existing code...

return (
    <div className="article-page container-fluid py-5">
        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="card border-0 shadow-sm">
                    <div className="article-image-container">
                        <img 
                            src={article.imageUrl} 
                            className="article-image" 
                            alt="Article header"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </div>
                    <div className="card-body p-4">
                    <div className="article-content">
                                <p className="article-text">{article.text}</p>
                                <div className="d-flex gap-3 mt-4">
                                    {article.linkUrl && (
                                        <a 
                                            href={article.linkUrl}
                                            className="btn btn-primary"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit Link
                                        </a>
                                    )}
                                    <button 
                                        onClick={() => navigate(-1)} 
                                        className="btn btn-outline-secondary"
                                    >
                                        ← Back
                                    </button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ArticlePage;
