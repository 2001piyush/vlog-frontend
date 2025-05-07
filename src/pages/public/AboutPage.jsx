import React, { useEffect, useState } from 'react';
import { getPublicAbout } from '../../api'; // Import the new API function

function AboutPage() {
    const [aboutContent, setAboutContent] = useState({ title: 'Loading...', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const data = await getPublicAbout();
                setAboutContent(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load about page content.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchAboutContent();
    }, []);


    if (loading) return <div className="container mt-4">Loading about page...</div>; // Basic loading indicator
    if (error) return <div className="container mt-4 text-danger">Error: {error}</div>; // Basic error message

    return (
        <div className="container mt-4"> {/* Use Bootstrap container if not already in main */}
            <h2 className="mb-3">{aboutContent.title}</h2> {/* Display the fetched title */}
            {/* Display the fetched content. Use dangerouslySetInnerHTML if content might contain HTML */}
            {/* <div dangerouslySetInnerHTML={{ __html: aboutContent.content }} /> */}
            {/* Otherwise, just display as plain text */}
            <p>{aboutContent.content}</p>
        </div>
    );
}

export default AboutPage;