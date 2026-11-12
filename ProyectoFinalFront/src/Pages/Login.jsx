import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UsuarioService } from '../Services/Usuario';

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const data = await UsuarioService.login(credentials);
      // Guardar sesión y redirigir
      localStorage.setItem('usuario', JSON.stringify(data));
      navigate('/index');
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.message || 'Credenciales incorrectas');
      } else {
        setMensaje('No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>

      {mensaje && <p style={{ color: 'red', marginTop: '15px' }}>{mensaje}</p>}

      <p style={{ marginTop: '15px' }}>
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;