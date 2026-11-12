import axios from 'axios';

// Puerto HTTPS real de tu API en ASP.NET Core
const API_URL = 'https://localhost:7030/api/Usuario';

export const UsuarioService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  registro: async (userData) => {
    const response = await axios.post(`${API_URL}/registro`, userData);
    return response.data;
  }
};