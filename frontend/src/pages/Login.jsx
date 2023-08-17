import React, { useEffect, useState } from "react";
import LoginForm from "../components/forms/LoginForm/LoginForm";
import useTitle from "../lib/hooks/useTitle";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import axios from "../lib/utils/axios.util";
import GoogleLoginBtn from "../components/buttons/google-login/GoogleLoginBtn";

const Login = () => {
  const [user, setUser] = useState();
  // const login = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     setUser(res.access_token);
  //     await setTokenInCookies(res.access_token);
  //   },
  // });

  useEffect(() => {
    if (user) {
      const URL = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`;
      axios
        .get(URL)
        .then(({ data }) => console.log(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  useTitle("Login");
  return (
    <article>
      <h1>Inicia sesión</h1>
      <LoginForm />
      <p>o</p>
      <GoogleLoginBtn />
    </article>
  );
};

export default Login;
