import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        setStatusMsg({ text: '', isError: false });

        if (!username || !password) {
            setStatusMsg({ text: "ERROR: CREDENCIALES INCOMPLETAS.", isError: true });
            return;
        }

        setIsSubmitting(true);
        
        try {
            const data = await authService.login(username, password);
            setStatusMsg({ text: "ACCESO CONCEDIDO. INICIANDO SESIÓN...", isError: false });
            
            localStorage.setItem('username', data.nombre);
            
            setTimeout(() => {
                navigate('/welcome');
            }, 300);
            
        } catch (err) {
            setStatusMsg({ text: `ACCESO DENEGADO: ${err.message}`, isError: true });
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
                    <h1 className="title">LOGIN</h1>
                    <p className="subtitle">Ingresa tus credenciales de acceso.</p>
                    
                    {statusMsg.text && (
                        <div className={`status-message ${statusMsg.isError ? 'status-error' : 'status-success'}`}>
                            {statusMsg.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="form-group">
                        <input 
                            type="text" 
                            placeholder="USUARIO" 
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
                                {isSubmitting ? 'AUTENTICANDO...' : 'ACCEDER'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/register')} 
                                className="secondary-btn"
                                disabled={isSubmitting}
                            >
                                CREAR CUENTA
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;