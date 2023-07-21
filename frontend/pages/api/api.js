import axios from 'axios';

const BASE_URL = 'http://localhost:8095/api/v1'; // Reemplaza esta URL con la URL base de tu API

export const loginUser = async (correo, clave) => {
  try {
    const response = await axios.post(`${BASE_URL}/inicio_sesion`, { correo, clave });
    console.log(response);
    return response;
  } catch (error) {
    console.log("ERROR EN API INICIO DE SESION "+ error);
    throw new Error('Error al iniciar sesión');
  }
};

export const registro = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/personas/guardar`, { userData });
      console.log(response);
      return response;
    } catch (error) {
      console.log("ERROR EN API INICIO DE REGISTRO "+ error);
      throw new Error('Error al iniciar sesión');
    }
  };