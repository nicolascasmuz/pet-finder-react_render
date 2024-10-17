import React from "react";
import { SelectedPetMapComp } from "../components/SelectedPetMapComp";
import "./selected-pet-map-page.css";

function SelectedPetMapPage() {
  return (
    <div className="selected-pet-map-page__general-container">
      <SelectedPetMapComp />
    </div>
  );
}

export { SelectedPetMapPage };
