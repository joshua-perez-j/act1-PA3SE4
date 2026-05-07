import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Productos from './components/Productos';
import Ventas from './components/Ventas';
import Proveedores from './components/Proveedores';
import './style.css'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Panel Principal */}
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Nuevos Módulos de Gestión */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/proveedores" element={<Proveedores />} />

        {/* Redirigir cualquier ruta no existente al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;