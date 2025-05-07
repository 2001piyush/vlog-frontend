import React, { useEffect, useState } from 'react';
import { getAdminAbout, updateAdminAbout } from '../../api';
// Assuming you are using Bootstrap classes

function AboutPageManager() {
    const [aboutContent, setAboutContent] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveStatus, setSaveStatus] = useState(''); // To show save success/error message

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const data = await getAdminAbout();
                setAboutContent(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load about page content for editing.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchAboutContent();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAboutContent({
            ...aboutContent,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaveStatus(''); // Clear previous save status

        if (!aboutContent.title || !aboutContent.content) {
            setSaveStatus('Title and content cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            await updateAdminAbout(aboutContent);
            setSaveStatus('Content saved successfully!');
            setLoading(false);
        } catch (err) {
            setSaveStatus('Failed to save content.');
            setLoading(false);
            console.error(err);
        }
    };

    if (loading) return <p>Loading about page content...</p>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <div className="mb-4 p-4 border rounded bg-light"> {/* Bootstrap classes */}
            <h3 className="mb-3 border-bottom pb-2">Manage About Page Content</h3> {/* Bootstrap classes */}

            {saveStatus && (
                <div className={`alert ${saveStatus.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {saveStatus}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3"> {/* Bootstrap margin-bottom */}
                    <label htmlFor="aboutTitle" className="form-label">Title:</label> {/* Bootstrap form label */}
                    <input
                        type="text"
                        className="form-control" // Bootstrap form control
                        id="aboutTitle"
                        name="title"
                        value={aboutContent.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3"> {/* Bootstrap margin-bottom */}
                    <label htmlFor="aboutContent" className="form-label">Content:</label> {/* Bootstrap form label */}
                    <textarea
                        className="form-control" // Bootstrap form control
                        id="aboutContent"
                        name="content"
                        value={aboutContent.content}
                        onChange={handleChange}
                        required
                        rows="8"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}> {/* Bootstrap primary button */}
                    {loading ? 'Saving...' : 'Save Content'}
                </button>
            </form>
        </div>
    );
}

export default AboutPageManager;