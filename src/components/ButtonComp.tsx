import React from "react";
import "./button-comp.css";

export function ButtonComp(props) {
  return (
    <button
      className="button"
      style={{
        display: props.buttonDisplay ? "none" : "block",
        backgroundColor: props.color,
      }}
      onClick={props.onClick}
    >
      {props.textContent}
    </button>
  );
}
