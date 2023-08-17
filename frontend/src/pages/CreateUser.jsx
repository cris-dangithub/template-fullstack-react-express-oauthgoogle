import React, { useEffect } from "react";
import CreateForm from "../components/forms/CreateForm/CreateForm";
import { docConsts } from "../lib/constants/document";
import useTitle from "../lib/hooks/useTitle";

const CreateUser = () => {
  useTitle("Create User");
  return (
    <article>
      <h1>Crear un usuario</h1>
      <CreateForm />
    </article>
  );
};

export default CreateUser;
