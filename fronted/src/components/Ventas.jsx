import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Ventas = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ producto: '', monto: '', fecha: '' });
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('username')) navigate('/login');
        fetchDatos();
    }, [navigate]);

    const fetchDatos = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/ventas');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    producto: formData.producto,
                    monto: parseFloat(formData.monto),
                    fecha: formData.fecha
                })
            });
            
            if (response.ok) {
                setFormData({ producto: '', monto: '', fecha: '' });
                fetchDatos(); 
            }
        } catch (error) {
            console.error("Error al guardar venta:", error);
        }
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <div className="logo">Act1 Web - Ventas</div>
                <button onClick={() => navigate('/welcome')} className="secondary-btn" style={{ marginLeft: 'auto', padding: '8px 20px' }}>VOLVER</button>
            </div>
            
            <div className="welcome-portal" style={{ flexDirection: 'column', alignItems: 'flex-start', paddingTop: '40px' }}>
                <div className="content" style={{ width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>REGISTRAR VENTA</h2>
                    <form onSubmit={handleSubmit} className="form-group">
                        <input type="text" placeholder="NOMBRE DEL PRODUCTO VENDIDO" className="input-field" value={formData.producto} onChange={(e) => setFormData({...formData, producto: e.target.value})} required />
                        <input type="number" step="0.01" placeholder="MONTO TOTAL" className="input-field" value={formData.monto} onChange={(e) => setFormData({...formData, monto: e.target.value})} required />
                        <input type="date" className="input-field" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} required />
                        <button type="submit" className="primary-btn">REGISTRAR VENTA</button>
                    </form>
                </div>

                <div className="content" style={{ marginTop: '40px', width: '100%', maxWidth: '600px' }}>
                    <h2 className="title" style={{ fontSize: '2rem' }}>HISTORIAL (JSON)</h2>
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

export default Ventas;