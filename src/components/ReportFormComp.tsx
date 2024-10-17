import React from "react";
import { ButtonComp } from "./ButtonComp";
import "./report-form-comp.css";

function ReportFormComp(props) {
  return (
    <form
      className="report-form"
      onSubmit={props.onSubmit}
      style={{ display: props.reportFormDisplay ? "flex" : "none" }}
    >
      <label className="report-form__label">
        ¿DÓNDE LO VISTE?
        <textarea className="report-form__textarea" name="info"></textarea>
      </label>
      <ButtonComp
        className="button-submit"
        color="#00a884"
        textContent="Enviar información"
      />
    </form>
  );
}

export { ReportFormComp };
