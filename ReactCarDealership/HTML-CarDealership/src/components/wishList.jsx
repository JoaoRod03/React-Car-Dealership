import React from "react";
import "../../public/stylesheets/carDisplay.css";
import CarCard from "./carCard.jsx";

function Wishlist({ wishlist, removeFromWishlist }) {
    return (
        <div className="car-display-container">
            <div className="car-display">
                {wishlist.map((car, index) => (
                    <CarCard key={index} car={car}>
                        <button onClick={() => removeFromWishlist(car._id)}>Remove</button>
                    </CarCard>
                ))}
            </div>
        </div>
    );
}

export default Wishlist;
