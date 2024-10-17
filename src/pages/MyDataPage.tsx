import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import { Link } from "react-router-dom";
import { dataSelector } from "../atoms/data-atoms";
import { useRecoilValue } from "recoil";
import "./my-data-page.css";

export function MyDataPage() {
  const userData = useRecoilValue(dataSelector);

  return (
    <div className="general-container">
      <h1 className="data-main-title">Mis datos</h1>
      <div className="data-container">
        <center>
          <img
            className="profile-pic-field"
            src={userData.picURL}
            alt="profile-pic-field"
          />
        </center>
        <p className="name-field">
          NICK: <span className="name-span">{userData.nickname}</span>
        </p>
        <p className="email-field">
          EMAIL: <span className="email-span">{userData.email}</span>
        </p>
        <p className="address-field">
          DIRECCIÓN: <span className="location-span">{userData.address}</span>
        </p>
        <p className="location-field">
          LOCALIDAD: <span className="location-span">{userData.location}</span>
        </p>
      </div>
      <div className="options-container">
        <Link to="/edit-pic" className="button-datos">
          <ButtonComp color="#ff7f87" textContent="Cambiar foto" />
        </Link>
        <Link to="/edit-data" className="button-datos">
          <ButtonComp color="#ff7f87" textContent="Modificar datos" />
        </Link>
        <Link to="/edit-pass" className="button-contraseña">
          <ButtonComp color="#ff7f87" textContent="Modificar contraseña" />
        </Link>
      </div>
    </div>
  );
}
