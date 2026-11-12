import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Index = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos guardados tras el Login
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      // Si no hay sesión guardada, regresa al login
      navigate('/login');
    } else {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, [navigate]);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (!usuario) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '40px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1>¡Bienvenido, {usuario.nombre}!</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>
        Has ingresado exitosamente con el rol de: <strong>{usuario.rol}</strong>
      </p>
      
      <button 
        onClick={handleCerrarSesion} 
        style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};