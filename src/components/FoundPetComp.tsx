import React from "react";
import "./found-pet-comp.css";

export function FoundPetComp(props) {
  return (
    <div
      className="report-window"
      onClick={props.onClick}
      style={{ display: props.fpDisplay ? "grid" : "none" }}
    >
      <label className="report-form__label">
        ¿YA ENCONTRASTE A {props.name.toUpperCase()}?
      </label>
      <button className="button-yes" onClick={props.yesOnClick}>
        SI
      </button>
      <button className="button-no" onClick={props.noOnClick}>
        NO
      </button>
    </div>
  );
}
