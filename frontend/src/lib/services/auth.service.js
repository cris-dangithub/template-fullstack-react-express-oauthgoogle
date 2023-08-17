import axios from "../utils/axios.util";

/**
 * Servicio para crear usuarios
 * @param data - datos para crear el usuario
 */
export const createUser = async (data) => {
  return axios.post("/auth", data);
};

/**
 * Servicio para el logeo de usuarios
 * @param data - objeto con: email, password 
 */
export const loginUser = async (data) => {
  return axios.post("/auth/login", data);
};
