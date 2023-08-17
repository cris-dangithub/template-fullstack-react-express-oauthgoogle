import axios from "axios";
import Cookies from "js-cookie";
import { getTokenFromCookie } from "./cookies.util";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

/**
 * Configuracion de la instancia la cual analiza si existe un token y, en caso de ser así,
 * anexa el token en los headers de la request.
 */
instance.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  // (error) => {
  //   if (error.response && error.response.status === 401) {
  //     //TODODEV:  Redirigir a la página de inicio en caso de un error de autorización, aquí podemos agregar lógica para manejar mejor el error.
  //     // ...
  //   }
  //   return Promise.reject(error);
  // }
);

export default instance;
