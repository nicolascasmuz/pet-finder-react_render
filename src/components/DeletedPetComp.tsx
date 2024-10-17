import React from "react";
import "./deleted-pet-comp.css";

export function DeletedPetComp(props) {
  return (
    <div
      className="report-window"
      onClick={props.onClick}
      style={{ display: props.dpDisplay ? "grid" : "none" }}
    >
      <label className="report-form__label">
        ¿ESTÁS SEGURO DE ELIMINAR ESTE REPORTE?
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
