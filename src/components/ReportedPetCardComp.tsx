import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelectedPet } from "../hooks/useSelectedPet";
import "./reported-pet-card-comp.css";

export function ReportedPetCardComp(props) {
  const navigate = useNavigate();
  const { selectMyReportedPet } = useSelectedPet();

  const handleClick = async (e) => {
    e.preventDefault();
    const petId = props.id;
    try {
      await selectMyReportedPet(petId);
    } catch (error) {
      console.error(error);
    }
    navigate("/edit-report");
  };

  return (
    <div className="card__container">
      <img className="card__img" src={props.picURL} alt="test-pic" />
      <div className="card__name-button">
        <h3 className="card__name">{props.name}</h3>
        <Link to="/edit-report">
          <button className="card__button" onClick={handleClick}>
            Editar
          </button>
        </Link>
      </div>
      <p className="card__details">{props.details}</p>
    </div>
  );
}
