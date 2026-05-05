import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('username');

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <div className="logo">Act1 Web</div>
            </div>
            <div className="welcome-portal">
                <div className="content">
                    <h1 className="title">Welcome, {user || 'OPERATOR'}</h1>
                    <p className="subtitle">Acceso autorizado. Bienvenido al panel principal.</p>
                    <button onClick={handleLogout} className="secondary-btn">LOGOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;