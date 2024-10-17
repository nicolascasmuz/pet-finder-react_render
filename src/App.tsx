import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HeaderComp } from "./components/HeaderComp";
import { HeaderMenuComp } from "./components/HeaderMenuComp";
import { dataSelector } from "./atoms/data-atoms";
import { useRecoilValue } from "recoil";
import "./App.css";

export function App() {
  const userData = useRecoilValue(dataSelector);
  const location = useLocation();

  const isSelectedPetMapPage = location.pathname.includes("/selected-pet-map");

  return (
    <div
      className={`app-container ${isSelectedPetMapPage ? "no-background" : ""}`}
    >
      {userData.userId ? (
        <HeaderMenuComp profilePic={userData.picURL} />
      ) : (
        <HeaderComp />
      )}
      <Outlet />
    </div>
  );
}
