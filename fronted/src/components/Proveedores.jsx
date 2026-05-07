import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Proveedores = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', contacto: '', empresa: '' });
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('username')) navigate('/login');
        fetchDatos();
    }, [navigate]);

    const fetchDatos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/proveedores');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al cargar proveedores:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/proveedores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    contacto: formData.contacto,
                    empresa: formData.empresa
                })
            });
            
            if (response.ok) {
                setFormData({ nombre: '', contacto: '', empresa: '' });
                fetchDatos(); 
            }
        } catch (error) {
            console.error("Error al guardar proveedor:", error);
        }
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <div className="logo">Act1 Web - Proveedores</div>
                <button onClick={() => navigate('/welcome')} className="secondary-btn" style={{ marginLeft: 'auto', padding: '8px 20px' }}>VOLVER</button>
            </div>
            
            <div className="welcome-portal" style={{ flexDirection: 'column', alignItems: 'flex-start', paddingTop: '40px' }}>
                <div className="content" style={{ width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>NUEVO PROVEEDOR</h2>
                    <form onSubmit={handleSubmit} className="form-group">
                        <input type="text" placeholder="NOMBRE DEL CONTACTO" className="input-field" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                        <input type="text" placeholder="TELÉFONO O CORREO" className="input-field" value={formData.contacto} onChange={(e) => setFormData({...formData, contacto: e.target.value})} required />
                        <input type="text" placeholder="EMPRESA" className="input-field" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})} required />
                        <button type="submit" className="primary-btn">REGISTRAR PROVEEDOR</button>
                    </form>
                </div>

                <div className="content" style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>LISTA DE PROVEEDORES (JSON)</h2>
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

export default Proveedores;