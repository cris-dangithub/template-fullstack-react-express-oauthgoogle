import useSWR from "swr";
import axios from "../utils/axios.util";

/**
 * Obtener todos los usuarios de la base de datos.
 * @returns Objeto que contiene la data, si hay un error, o si está cargando
 * apenas la petición (useSWR)
 */
export const useUsers = () => {
  const { data, error, isLoading } = useSWR("/user");
  return { data, error, isLoading };
};


