import React, { useEffect } from "react";
import { usePetsByRadius } from "../hooks/usePetsByRadius";
import { useSelectedPet } from "../hooks/useSelectedPet";
import { useRecoilValue } from "recoil";
import { dataSelector } from "../atoms/data-atoms";
import mapboxgl from "mapbox-gl";
import { SetRadiusFormComp } from "./SetRadiusFormComp";
import "./map-comp.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmljb2xhc2Nhc211eiIsImEiOiJjbGlnazg2cjExZTdvM21tcWl6eGU5bDM0In0.EtaC4N7nb_NuwfddaKZaow";
mapboxgl.accessToken = MAPBOX_TOKEN;

function MapComp() {
  const { petsByRadius } = usePetsByRadius();
  const { selectMissingPet } = useSelectedPet();
  const userData = useRecoilValue(dataSelector);

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: document.querySelector("#map"),
      style: "mapbox://styles/mapbox/streets-v11",
      center: [userData.lng, userData.lat],
      zoom: 12,
    });

    if (userData.petsByRadius) {
      for (const p of userData.petsByRadius) {
        const { lat, lng } = p._geoloc;

        const marker = new mapboxgl.Marker({ color: "#eb6372" })
          .setLngLat([lng, lat])
          .addTo(map);

        marker.getElement().addEventListener("click", async () => {
          const { lng, lat } = marker._lngLat;

          const selectedPetOnMap = userData.petsByRadius.find((p) => {
            return p._geoloc.lng == lng && p._geoloc.lat == lat;
          });

          console.log("selectedPetOnMap: ", selectedPetOnMap);

          try {
            await selectMissingPet(selectedPetOnMap);
          } catch (error) {
            console.error(error);
          }
        });
      }
    } else {
      null;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const distanceValue = e.target["distance"].value;

    const searchValues = {
      userID: userData.userId,
      lat: userData.lat,
      lng: userData.lng,
      distance: distanceValue,
    };

    try {
      await petsByRadius(searchValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SetRadiusFormComp onSubmit={handleSubmit} />
      <div className="map-comp__container">
        <div className="map-comp__map" id="map"></div>
      </div>
    </>
  );
}

export { MapComp };
