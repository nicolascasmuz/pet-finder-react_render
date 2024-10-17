import React from "react";
import "./found-pet-card-comp.css";

export function FoundPetCardComp(props) {
  return (
    <div className="card__container">
      <img className="card__img" src={props.picURL} alt="test-pic" />
      <div className="card__name-button">
        <h3 className="card__name">{props.name}</h3>
        <div className="card__found">ENCONTRADO</div>
      </div>
      <p className="card__details">{props.details}</p>
    </div>
  );
}
