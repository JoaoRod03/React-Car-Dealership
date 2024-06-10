import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/stylesheets/login.css';

function Login({ setToken }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const signUpButtonRef = useRef(null);
    const signInButtonRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        const signUpButton = signUpButtonRef.current;
        const signInButton = signInButtonRef.current;
        const main = mainRef.current;

        signUpButton.addEventListener('click', () => {
            main.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            main.classList.remove('right-panel-active');
        });

        // Cleanup event listeners on component unmount
        return () => {
            signUpButton.removeEventListener('click', () => {
                main.classList.add('right-panel-active');
            });

            signInButton.removeEventListener('click', () => {
                main.classList.remove('right-panel-active');
            });
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            setToken(data.token);
            localStorage.setItem('token', data.token);
            navigate('/');
        } else {
            alert("Credenciais inválidas!");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            setIsLoginMode(true);
        } else {
            alert("Credenciais inválidas!");
        }
    };

    return (
        <div className="body">
            <div className="container" ref={mainRef}>
                <div className="sign-up">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button className='loginPageButton' type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Log In</h1>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button className='loginPageButton' type="submit">Log In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Already have an account? Log in here.</p>
                            <button className='loginPageButton' id="signIn" ref={signInButtonRef}>Log In</button>
                        </div>
                        <div className="overlay-right">
                            <h1>Ride your dreams</h1>
                            <p>Don't have an account? Sign up here.</p>
                            <button className='loginPageButton' id="signUp" ref={signUpButtonRef}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
