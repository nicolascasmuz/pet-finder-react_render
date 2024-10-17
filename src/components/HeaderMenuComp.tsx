import React, { useEffect, useRef } from "react";
import "./header-menu-comp.css";
import petFinderLogo1 from "../resources/pet-finder-logo.png";
import burgerMenuImg from "../resources/burger-menu.png";
import { Link } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";

export function HeaderMenuComp({ profilePic }) {
  const logOut = useLogOut();
  const logOutRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const logOutEl = logOutRef.current;

    if (logOutEl) {
      logOutEl.addEventListener("click", logOut);

      return () => {
        logOutEl.removeEventListener("click", logOut);
      };
    }
  }, [logOut]);

  return (
    <header className="header">
      <img
        className="header__logo"
        src={petFinderLogo1}
        alt="pet-finder-logo"
      />
      <input className="header__menu-input" type="checkbox" id="check" />
      <label htmlFor="check" className="header__menu-label">
        <div className="header__pp-burger-container">
          <img
            className="header__profile-pic-menu"
            src={profilePic}
            alt="profile-pic-menu"
          />
          <img
            className="header__menu-img"
            src={burgerMenuImg}
            alt="menu-icon"
          />
        </div>
      </label>
      <ul className="header__menu-lista">
        <li>
          <Link to="/home" className="header__option">
            Inicio
          </Link>
          <Link to="/my-data" className="header__option">
            Mis datos
          </Link>
          <Link to="/reported-pets" className="header__option">
            Mascotas reportadas
          </Link>
          <Link to="/new-report" className="header__option">
            Reportar mascota
          </Link>
          <Link to="/map" className="header__option">
            Mapa
          </Link>
          <Link to="/main" className="header__option-log-out" ref={logOutRef}>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </header>
  );
}
