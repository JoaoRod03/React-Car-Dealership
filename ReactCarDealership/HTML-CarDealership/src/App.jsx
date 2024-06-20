import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/header.jsx";
import CarDisplay from "./components/carDisplay.jsx";
import CarPage from "./components/carPage.jsx";
import Login from './components/login.jsx';
import Wishlist from './components/wishList.jsx';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [cars, setCars] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cars');
                const data = await response.json();
                setCars(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    function getCarById(id) {
        return cars.find(car => car._id === id);
    }

    const addToWishlist = (car) => {
        setWishlist(prevWishlist => [...prevWishlist, car]);
    };

    const removeFromWishlist = (carId) => {
        setWishlist(prevWishlist => prevWishlist.filter(car => car._id !== carId));
    };

    const CarPageWrapper = () => {
        const { id } = useParams();
        const car = getCarById(id);
        return <CarPage car={car} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlist={wishlist} token={token} />;
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username'); 
        setUsername(''); 
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Router>
            <Header token={token} handleLogout={handleLogout} username={username} />
            <Routes>
                <Route path="/" element={<CarDisplay cars={cars} />} />
                <Route path="/car/:id" element={<CarPageWrapper />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/wishlist" element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />} />
            </Routes>
        </Router>
    );
}

export default App;
