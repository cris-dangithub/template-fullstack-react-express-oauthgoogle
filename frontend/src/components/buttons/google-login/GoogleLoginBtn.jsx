import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { loginUserWithGoogle } from "../../../lib/services/google.service";
import { setTokenInCookies } from "../../../lib/utils/cookies.util";

export default function GoogleLoginBtn() {
  const [user, setUser] = useState(null);

  const handleSuccess = (credentialResponse) => {
    const asyncHandleSuccess = async () => {
      try {
        const { credential } = credentialResponse;
        if (credential) {
          //recuperar las credenciales obteniendo el payload desde el servidor (backend)
          await setTokenInCookies(credential);
          //logueamos en la app (endopont de nuestro backend)
          const { data: dataLogin } = await loginUserWithGoogle();
          console.log(dataLogin);
          //poner el token de nuestra app en las cookies
          await setTokenInCookies(dataLogin.token);
          setUser(dataLogin.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    asyncHandleSuccess();
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <div>
      {!user ? (
        <GoogleLogin
          useOneTap
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ) : (
        <p>Ha iniciado sesion con {user.username}</p>
      )}
    </div>
  );
}
