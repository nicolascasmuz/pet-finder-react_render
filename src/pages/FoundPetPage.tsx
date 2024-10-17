import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import "./found-pet-page.css";
import { Link } from "react-router-dom";
import foundPetPic from "../resources/found-pet.png";

export function FoundPetPage() {
  return (
    <div className="general-container">
      <h1 className="found-pet-main-title">
        Nos alegramos de que hayas encontrado a tu mascota
      </h1>
      <img className="found-pet-picture" src={foundPetPic} alt="empty-pic" />
      <Link to="/home" className="come-back-button">
        <ButtonComp color="#ff7f87" textContent="Volver" />
      </Link>
    </div>
  );
}
