import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Productos = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', precio: '', cantidad: '' });
    const navigate = useNavigate();
    
    // Evita acceso sin login (mismo esquema inseguro de Welcome.jsx)
    useEffect(() => {
        if (!localStorage.getItem('username')) navigate('/login');
        fetchDatos();
    }, [navigate]);

    const fetchDatos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/productos');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    precio: parseFloat(formData.precio),
                    cantidad: parseInt(formData.cantidad, 10)
                })
            });
            
            if (response.ok) {
                setFormData({ nombre: '', precio: '', cantidad: '' });
                fetchDatos(); // Refrescar la lista
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <div className="logo">Act1 Web - Productos</div>
                <button onClick={() => navigate('/welcome')} className="secondary-btn" style={{ marginLeft: 'auto', padding: '8px 20px' }}>VOLVER</button>
            </div>
            
            <div className="welcome-portal" style={{ flexDirection: 'column', alignItems: 'flex-start', paddingTop: '40px' }}>
                <div className="content" style={{ width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>AGREGAR PRODUCTO</h2>
                    <form onSubmit={handleSubmit} className="form-group">
                        <input type="text" placeholder="NOMBRE DEL PRODUCTO" className="input-field" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                        <input type="number" step="0.01" placeholder="PRECIO" className="input-field" value={formData.precio} onChange={(e) => setFormData({...formData, precio: e.target.value})} required />
                        <input type="number" placeholder="CANTIDAD" className="input-field" value={formData.cantidad} onChange={(e) => setFormData({...formData, cantidad: e.target.value})} required />
                        <button type="submit" className="primary-btn">REGISTRAR</button>
                    </form>
                </div>

                <div className="content" style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>INVENTARIO ACTUAL</h2>
                    <div style={{ background: '#111', border: '1px solid #333', padding: '20px' }}>
                        <pre style={{ color: 'var(--accent-yellow)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                            {JSON.stringify(items, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productos;