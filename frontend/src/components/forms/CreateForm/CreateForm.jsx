import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../../lib/services/auth.service";
import "./createForm.scss";
import Input from "../inputs/Input";
const txtFields = [
  { title: "Nombre de usuario", name: "username", type: "text" },
  { title: "Email", name: "email", type: "email" },
  { title: "Contraseña", name: "password", type: "password" },
];
const defaultValues = {
  role: "",
  username: "",
  email: "",
  password: "",
  profileImgUrl: null,
};

/**
 * Contiene campos con texto (email, password, etc.),
 * selects y también para ingresar una imagen.
 * @returns Componente para crear
 */
const CreateForm = () => {
  const formElement = useRef(null);
  const inputImgRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const watchImg = watch("profileImgUrl");

  const onSubmit = () => {
    const formData = new FormData(formElement.current);
    createUser(formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const selectFile = () => inputImgRef.current.click();

  useEffect(() => {
    /**
     * Es importante guardar manualmente la referencia,
     * pues al usar el register, esta no permite asignarla directamente en el jsx
     */
    inputImgRef.current = document.getElementById("profileImgUrl");
  }, []);

  return (
    <form
      ref={formElement}
      className="c-create-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {txtFields.map((field) => (
        <Input
          key={field.title}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      <section>
        <label className="c-create-form__label">Rol:</label>
        <select
          className={`${errors.role && "c-create-form__input--error"}`}
          {...register("role", { required: true })}
          id="role"
          defaultValue=""
        >
          <option value="" disabled>
            Elige un rol
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
      </section>

      <section>
        <section className="c-create-form__img-label">
          <input
            type="file"
            accept=".jpg,.png"
            hidden
            id="profileImgUrl"
            {...register("profileImgUrl")}
          />
          <p>Agrega una imagen de perfil</p>
          <div>
            {watchImg?.length ? (
              <img src={URL.createObjectURL(watchImg[0])} alt="profileImgUrl" />
            ) : (
              <div onClick={() => selectFile()}>+</div>
            )}
          </div>
        </section>
        {Boolean(watchImg?.length) && (
          <>
            <button type="button" onClick={() => selectFile()}>
              CAMBIAR IMAGEN
            </button>
            <button type="button" onClick={() => resetField("profileImgUrl")}>
              QUITAR IMAGEN
            </button>
          </>
        )}
      </section>

      <button>Crear</button>
      <button type="button" onClick={() => reset()}>
        Limpiar
      </button>
    </form>
  );
};

export default CreateForm;
