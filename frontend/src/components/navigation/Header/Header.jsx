import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/create-user"}>Crear usuario</Link>
          </li>
          <li>
            <Link to={"/login"}>Iniciar sesion</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
