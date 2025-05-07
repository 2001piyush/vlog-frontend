import React, { useEffect, useState } from 'react';
import { getAdminBanner, addBannerImage, deleteBannerImage } from '../../api';

function BannerManager() {
    const [bannerImages, setBannerImages] = useState([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addError, setAddError] = useState(null);

    const fetchBannerImages = async () => {
        try {
            setLoading(true);
            const images = await getAdminBanner();
            setBannerImages(images);
            setLoading(false);
        } catch (err) {
            setError('Failed to load banner images for admin.');
            setLoading(false);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBannerImages();
    }, []);

    const handleAddImage = async (e) => {
        e.preventDefault();
        setAddError(null);
        if (!newImageUrl) {
            setAddError('Image URL cannot be empty.');
            return;
        }
        try {
            await addBannerImage(newImageUrl);
            setNewImageUrl('');
            fetchBannerImages(); // Refresh the list
        } catch (err) {
            setAddError('Failed to add banner image.');
            console.error(err);
        }
    };

    const handleDeleteImage = async (imageId) => {
        if (window.confirm('Are you sure you want to delete this banner image?')) {
            try {
                await deleteBannerImage(imageId);
                fetchBannerImages(); // Refresh the list
            } catch (err) {
                alert('Failed to delete banner image.');
                console.error(err);
            }
        }
    };

    return (
        <div className="mb-4 p-4 border rounded bg-light"> {/* Bootstrap classes */}
            <h3 className="mb-3 border-bottom pb-2">Manage Banner Images</h3> {/* Bootstrap classes */}

            <form onSubmit={handleAddImage} className="mb-3 d-flex flex-wrap align-items-center"> {/* Bootstrap classes */}
                <div className="flex-grow-1 me-2 mb-2 mb-md-0"> {/* Bootstrap flex and margin utilities */}
                    <input
                        type="text"
                        className="form-control" // Bootstrap form control
                        placeholder="New Banner Image URL"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success mb-2 mb-md-0">Add Image</button> {/* Bootstrap success button */}
                {addError && <div className="text-danger text-sm mt-2 w-100">{addError}</div>} {/* Bootstrap text and width utilities */}
            </form>

            {loading && <p>Loading images...</p>}
            {error && <div className="text-danger">{error}</div>} {/* Bootstrap text-danger */}

            {/* Use Bootstrap Grid for the image list */}
            <div className="row g-3"> {/* Bootstrap row with gutter */}
                {bannerImages.map((image) => (
                    <div key={image._id} className="col-auto"> {/* col-auto sizes column based on content */}
                        <div className="card" style={{ width: '100px' }}> {/* Bootstrap card with fixed width */}
                            <img src={image.imageUrl} className="card-img-top" alt="Banner Preview" style={{ height: '60px', objectFit: 'cover' }} /> {/* Bootstrap img-top, inline for size */}
                            <div className="card-body p-1 text-center"> {/* Reduced padding */}
                                <p className="card-text text-muted text-sm mb-1">{image.imageUrl.substring(0, 15)}...</p> {/* Truncated URL */}
                                <button
                                    onClick={() => handleDeleteImage(image._id)}
                                    className="btn btn-danger btn-sm" // Bootstrap danger button, small size
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             {bannerImages.length === 0 && !loading && !error && <p className="text-muted mt-3">No banner images added yet.</p>} {/* Bootstrap text-muted */}
        </div>
    );
}

export default BannerManager;