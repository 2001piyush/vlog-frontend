import React, { useEffect, useState } from 'react';
import { getPublicBanner } from '../../api';
import './Banner.css';
function Banner() {
    const [bannerImages, setBannerImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBannerImages = async () => {
            try {
                const images = await getPublicBanner();
                setBannerImages(images);
                setLoading(false);
            } catch (err) {
                setError('Failed to load banner images.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchBannerImages();
    }, []);

    useEffect(() => {
        if (bannerImages.length > 1) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [bannerImages]);

    if (loading) return <p>Loading banner...</p>;
    if (error) return <p>{error}</p>;
    if (bannerImages.length === 0) return null;

    const currentImage = bannerImages[currentIndex];

    return (
        <div className="carousel">
            {currentImage && (
                <img
                    src={currentImage.imageUrl}
                    alt={`Banner ${currentIndex + 1}`}
                    className="d-block w-100"
                />
            )}
        </div>
    );
}

export default Banner;