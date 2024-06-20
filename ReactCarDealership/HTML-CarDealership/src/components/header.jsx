import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/stylesheets/header.css';

function Header({ token, handleLogout, username}) {

    return (
        <header className="header">
            <div className="menu">
                <Link className="button" to="/">Cars on Display</Link>
            </div>
            <div className="nav">
                {token ? (
                    <div>
                        <Link className="button" to="/wishlist">Wishlist</Link>
                        <button className="button" onClick={handleLogout}>Logout</button>
                        <a style={{fontSize:'16px',cursor:"default"}}>Welcome {username}</a>
                    </div>
                ) : (
                    <Link className="button" to="/login">Login</Link>
                )}
            </div>
        </header>
    );
}

export default Header;