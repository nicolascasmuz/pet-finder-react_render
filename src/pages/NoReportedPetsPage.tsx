import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import "./no-reported-pets-page.css";
import { Link } from "react-router-dom";
import emptyPic from "../resources/picture-02.png";

export function NoReportedPetsPage(props) {
  return (
    <div className="general-container">
      <h1 className="main-title">Mascotas reportadas</h1>
      <p className="paragraph">Aún no reportaste mascotas perdidas</p>
      <img
        className="no-reported-pets-picture"
        src={emptyPic}
        alt="empty-pic"
      />
      <Link to="/new-report" className="button-report">
        <ButtonComp color="#ff7f87" textContent="Reportar mascota" />
      </Link>
    </div>
  );
}
