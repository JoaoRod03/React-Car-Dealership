import React from "react";
import "../../public/stylesheets/carDisplay.css";
import CarCard from "./carCard.jsx";

function CarDisplay({ cars }) {
    return (
        <div className="car-display-container">
            <div className="car-display">
                {cars.map((car, index) => (
                    <CarCard key={index} car={car} />
                ))}
            </div>
        </div>
    );
}

export default CarDisplay;