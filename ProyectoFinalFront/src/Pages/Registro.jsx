import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UsuarioService } from '../Services/Usuario';

export const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'EMPLEADO'
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      // Usar el servicio centralizado en lugar de Axios directo
      await UsuarioService.registro(formData);
      
      alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.message || 'Error al registrar usuario');
      } else {
        setMensaje('No se pudo conectar con el servidor.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Rol:</label>
          <select name="rol" value={formData.rol} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="EMPLEADO">EMPLEADO</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            <option value="CLIENTE">CLIENTE</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>

      {mensaje && <p style={{ color: 'red', marginTop: '15px' }}>{mensaje}</p>}

      <p style={{ marginTop: '15px' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};