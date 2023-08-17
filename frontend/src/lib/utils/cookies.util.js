import Cookies from "js-cookie";

export const setTokenInCookies = async (token) => {
  return Cookies.set("token", token);
};

export const getTokenFromCookie = async () => {
  return Cookies.get("token");
};