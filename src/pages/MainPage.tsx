import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import "./main-page.css";
import picture01 from "../resources/picture-01.jpg";
import { useLogOut } from "../hooks/useLogOut";
import { Link } from "react-router-dom";

function MainPage() {
  const logOut = useLogOut();

  logOut();

  return (
    <div className="general-container">
      <img
        className="main-page-picture"
        src={picture01}
        alt="main-page-picture"
      />
      <h1 className="app-name">Pet Finder</h1>
      <p className="paragraph">
        Encontrá y reportá mascotas perdidas cerca de tu ubicación
      </p>
      <Link to="/log-in" className="button-ingresar">
        <ButtonComp color="#8896e0" textContent={"Ingresar"} />
      </Link>
      <Link to="/sign-up" className="button-registrarse">
        <ButtonComp
          className="button-registrarse"
          color="#8896e0"
          textContent={"Registrarse"}
        />
      </Link>
    </div>
  );
}

export { MainPage };
