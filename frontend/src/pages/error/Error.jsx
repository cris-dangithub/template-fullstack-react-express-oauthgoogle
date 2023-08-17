import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./error.scss";

/**
 * @returns 404 page
 */
const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error">
      <h2 className="error__title">Oops!</h2>
      <p className="error__info">
        {error.data} <br />
        {error.status} - {error.statusText}
      </p>

      <img src="/img/homer-404.png" alt="404-homer" className="error__img" />
      <Link to={"/"}>Go Home</Link>
    </div>
  );
};

export default Error;
