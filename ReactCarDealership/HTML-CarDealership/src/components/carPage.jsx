import React, { useState } from "react";
import '../../public/stylesheets/carPage.css';

function CarPage({ car, addToWishlist, removeFromWishlist, wishlist, token }) {
    const { images, brand, model, year, price, kms, color, interior, fuel } = car;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [warning, setWarning] = useState('');

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const isInWishlist = wishlist.some(item => item._id === car._id);

    const handleWishlistClick = () => {
        if (!token) {
            setWarning('You need to be logged in to add to wishlist');
            return;
        }
        if (isInWishlist) {
            removeFromWishlist(car._id);
        } else {
            addToWishlist(car);
        }
    };

    return (
        <div className="car-page">
            <div className="car-container">
                <div className="main-part">
                    <div className="images">
                        <button className="arrow prev" onClick={handlePrevImage}>
                            <img src="/images/previous.svg" alt="Previous" />
                        </button>
                        <img src={car.images[currentImageIndex]} alt={car.brand + " " + car.model + " " + car.year} />
                        <button className="arrow next" onClick={handleNextImage}>
                            <img src="/images/next.svg" alt="Next" />
                        </button>
                        <div className="indicators">
                            {images.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="car-main-info">
                        <h1>{`${brand} ${model}`}</h1>
                        <h1>{`${price}€`}</h1>
                        <button>
                            <img src="/images/buy-now.svg" alt="Buy now" className="button-icon" />
                            Buy now
                        </button>
                        <button>
                            <img src="/images/test-drive.svg" alt="Test Drive" className="button-icon" />
                            Test Drive
                        </button>
                        <button onClick={handleWishlistClick}>
                            <img
                                src={isInWishlist ? "/images/onwishlist.svg" : "/images/towishlist.svg"}
                                alt={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                className="button-icon"
                            />
                            {isInWishlist ? "Added to wishlist" : "Add to wishlist"}
                        </button>
                        {warning && <p className="warning">{warning}</p>}
                    </div>
                </div>
                <div className="description">
                    <div className="full-info">
                        <h1>Full Information</h1>
                        <div className="details">
                            <p><b>Brand:</b> {brand}</p>
                            <p><b>Model:</b> {model}</p>
                            <p><b>Year:</b> {year}</p>
                            <p><b>Kms:</b> {kms}</p>
                            <p><b>Color:</b> {color}</p>
                            <p><b>Interior:</b> {interior}</p>
                            <p><b>Fuel:</b> {fuel}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CarPage;
