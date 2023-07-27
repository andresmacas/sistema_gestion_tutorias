import axios from 'axios';
import { PersonaExternal, Session, Rol, ObtenerExternal, CerrarSession } from './useSession';

const BASE_URL = 'http://localhost:8095/api/v1'; // Reemplaza esta URL con la URL base de tu API

export const loginUser = async (correo, clave) => {
  try {
    const response = await axios.post(`${BASE_URL}/inicio_sesion`, { correo, clave });
    console.log(response);
    PersonaExternal(response.data.data.external);
    Session(response.data.data.token);
    Rol(response.data.data.rol);
    return response;

  } catch (error) {
    console.log("ERROR EN API INICIO DE SESION " + error);
    throw new Error('Error al iniciar sesión');
  }
};

// Metodo para registrar una persona
export const registro = async (data) => {
  const response = await fetch(`${BASE_URL}/personas/guardar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};


// Metodo para obtener el objeto persona de la sesion actual
export const obtenerPersonaActual = async () => {
  const external_id = ObtenerExternal();
  const response = await fetch(`${BASE_URL}/personas/obtener/${external_id}`);
  const result = await response.json();
  return result;
}

// Metodo para editar el objeto persona de la sesion actual
export const editarPersonaActual = async (data) => {
  const external_id = ObtenerExternal();
  const response = await fetch(`${BASE_URL}/personas/editar/${external_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.data.persona_external != null) {
    PersonaExternal(result.data.persona_external);
  }
  return result;
};

// Metodo para cerrar sesión
export const logout = async () => {

    CerrarSession();
}