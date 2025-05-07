import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContentBlock.css';

function ContentBlock({ block, gridClasses }) {
    const navigate = useNavigate();
    const snippetLength = 150;
    const textSnippet = block.text.substring(0, snippetLength);
    const needsTruncation = block.text.length > snippetLength;

    const handleReadMore = () => {
        if (!block._id) {
            console.error('Block ID is missing');
            return;
        }
        navigate(`/article/${block._id}`);
    };

    return (
        <div className={`${gridClasses} mb-4`}>
            <div className={`card content-block size-${block.size}`}>
                <div className="image-wrapper">
                    <img
                        src={block.imageUrl}
                        className="card-img-top"
                        alt={block.text.substring(0, 30)}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
                <div className="card-body d-flex flex-column">
                    <p className="card-text">
                        {textSnippet + (needsTruncation ? '...' : '')}
                    </p>
                    <div className="mt-auto">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleReadMore}
                        >
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentBlock; 