import React from 'react';
import { Link } from "react-router-dom";
import '../../public/stylesheets/carCard.css';

function CarCard({ car }) {
    const image = car.images[0]

    return (
        <div className="car-card">
            <Link to={`/car/${car._id}`}>
                <img src={image} alt={car.brand}/>
                <h2>{car.brand + " " + car.model + " " + car.year}</h2>
                <h3>{car.price}€</h3>
            </Link>
        </div>
    );
}

export default CarCard;