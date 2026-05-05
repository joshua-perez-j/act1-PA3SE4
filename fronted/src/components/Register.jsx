import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        setStatusMsg({ text: '', isError: false });

        if (!username || !password) {
            setStatusMsg({ text: "ERROR: Todos los campos son obligatorios.", isError: true });
            return;
        }

        setIsSubmitting(true);
        
        try {
            await authService.register(username, password);
            setStatusMsg({ text: "USUARIO REGISTRADO CORRECTAMENTE. REDIRIGIENDO...", isError: false });
            
            setTimeout(() => {
                navigate('/login');
            }, 1500);
            
        } catch (err) {
            setStatusMsg({ text: `ERROR: ${err.message}`, isError: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-container">
            <div className="top-bar">
                <div className="logo">Act1 Web</div>
            </div>
            <div className="welcome-portal">
                <div className="content">
                    <h1 className="title">NEW_USER</h1>
                    <p className="subtitle">Registra un nuevo operador en el sistema.</p>
                    
                    {statusMsg.text && (
                        <div className={`status-message ${statusMsg.isError ? 'status-error' : 'status-success'}`}>
                            {statusMsg.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleRegister} className="form-group">
                        <input 
                            type="text" 
                            placeholder="NUEVO USUARIO" 
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <input 
                            type="password" 
                            placeholder="CONTRASEÑA" 
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                        />
                        
                        <div className="actions">
                            <button 
                                type="submit" 
                                className="primary-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'PROCESANDO...' : 'REGISTRAR'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/login')} 
                                className="secondary-btn"
                                disabled={isSubmitting}
                            >
                                VOLVER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;