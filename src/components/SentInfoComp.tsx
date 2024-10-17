import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComp } from "./ButtonComp";
import "./sent-info-comp.css";

function SentInfoComp(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/map");
  };

  return (
    <div
      className="sent-info"
      style={{ display: props.sentInfoDisplay ? "flex" : "none" }}
    >
      <h3 className="sent-info__label">INFORMACIÓN ENVIADA</h3>
      <ButtonComp
        class="sent-info__button"
        color="#00a884"
        textContent="Volver"
        onClick={handleClick}
      />
    </div>
  );
}

export { SentInfoComp };
