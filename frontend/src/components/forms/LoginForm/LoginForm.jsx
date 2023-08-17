import React from "react";
import { useForm } from "react-hook-form";
import Input from "../inputs/Input";
import { loginUser } from "../../../lib/services/auth.service";
import Cookies from "js-cookie";
const txtFields = [
  { title: "Email", name: "email", type: "text" },
  { title: "Password", name: "password", type: "password" },
];

/**
 * @returns Formulario que va en la página de logueo
 */
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: resData } = await loginUser(data);
      // agregar el token a las cookies
      Cookies.set("token", resData.token);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {txtFields.map((field) => (
        <Input
          key={field.name}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      <button>Iniciar sesión</button>
      
    </form>
  );
};

export default LoginForm;
