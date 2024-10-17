import React from "react";
import "./header-comp.css";
import petFinderLogo1 from "../resources/pet-finder-logo.png";

export function HeaderComp() {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={petFinderLogo1}
        alt="pet-finder-logo"
      />
    </header>
  );
}
