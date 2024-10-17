import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import "./new-reported-pet-page.css";
import { Link } from "react-router-dom";
import missingPetPic from "../resources/missing-pet.png";

export function NewReportedPetPage() {
  return (
    <div className="general-container">
      <h1 className="new-reported-pet-main-title">
        Tu mascota ha sido reportada
      </h1>
      <img
        className="new-reported-pet-picture"
        src={missingPetPic}
        alt="empty-pic"
      />
      <Link to="/home" className="come-back-button">
        <ButtonComp color="#ff7f87" textContent="Volver" />
      </Link>
    </div>
  );
}
