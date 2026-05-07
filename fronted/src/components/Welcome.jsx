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
                <div className="logo" style={{ marginRight: 'auto' }}>Act1 Web</div>
                {/* Nuevos controles de navegación */}
                <div className="nav-buttons" style={{ display: 'flex', gap: '15px', marginRight: '20px' }}>
                    <button onClick={() => navigate('/productos')} className="secondary-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>PRODUCTOS</button>
                    <button onClick={() => navigate('/ventas')} className="secondary-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>VENTAS</button>
                    <button onClick={() => navigate('/proveedores')} className="secondary-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>PROVEEDORES</button>
                </div>
                <button onClick={handleLogout} className="primary-btn" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>LOGOUT</button>
            </div>
            <div className="welcome-portal">
                <div className="content">
                    <h1 className="title">Welcome, {user || 'OPERATOR'}</h1>
                    <p className="subtitle">Acceso autorizado. Bienvenido al panel principal.</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;