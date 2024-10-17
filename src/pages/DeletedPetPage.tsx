import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import { Link } from "react-router-dom";
import emptyPic from "../resources/picture-02.png";
import "./deleted-pet-page.css";

export function DeletedPetPage() {
  return (
    <div className="general-container">
      <h1 className="deleted-pet-main-title">El reporte ha sido eliminado</h1>
      <img className="found-pet-picture" src={emptyPic} alt="empty-pic" />
      <Link to="/home" className="come-back-button">
        <ButtonComp color="#ff7f87" textContent="Volver" />
      </Link>
    </div>
  );
}
