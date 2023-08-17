import axios from "./axios.util";

export const fetcher = (...args) => axios(...args).then(res => res.data)
