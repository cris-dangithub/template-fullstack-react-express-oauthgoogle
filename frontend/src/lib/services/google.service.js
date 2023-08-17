import axios from "../utils/axios.util";
/**
 *
 * @param data objeto con la siguientes propiedades:
 * email (proveniente del payload);
 *
 * @returns
 */
export const loginUserWithGoogle = async () => {
  return axios.post("/google");
};
