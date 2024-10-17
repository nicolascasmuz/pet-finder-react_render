import React, { useState, useEffect } from "react";
import { FormInputComp } from "../components/FormInputComp";
import { ButtonComp } from "../components/ButtonComp";
import { FoundPetComp } from "../components/FoundPetComp";
import { DeletedPetComp } from "../components/DeletedPetComp";
import { useEditReport } from "../hooks/useEditReport";
import { useDeleteReport } from "../hooks/useDeleteReport";
import { dataSelector } from "../atoms/data-atoms";
import { useRecoilValue } from "recoil";
import { Dropzone } from "dropzone";
import mapboxgl from "mapbox-gl";
import pinMap from "../resources/pin-map.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "./edit-report-page.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmljb2xhc2Nhc211eiIsImEiOiJjbGlnazg2cjExZTdvM21tcWl6eGU5bDM0In0.EtaC4N7nb_NuwfddaKZaow";
mapboxgl.accessToken = MAPBOX_TOKEN;

export function EditReportPage() {
  const editReport = useEditReport();
  const deleteReport = useDeleteReport();
  const userData: any = useRecoilValue(dataSelector);

  const [name, setName] = useState(userData.selectedPet.name);
  const [details, setDetails] = useState(userData.selectedPet.details);
  const [picFile, setPicFile] = useState<any>(undefined);
  const [mapCoordinates, setMapCoordinates] = useState<any>(undefined);
  const [fpCompDisplay, setFpCompDisplay] = useState(false);
  const [dpCompDisplay, setDpCompDisplay] = useState(false);

  const addPetPicEl = document.querySelector(".add-pet-pic") as HTMLElement;
  const addPetPicSrcEl = document.querySelector(
    ".add-pet-pic"
  ) as HTMLSourceElement;

  useEffect(() => {
    if (addPetPicEl) {
      let myDropzone = new Dropzone(addPetPicEl, {
        url: "/file/post",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", (file) => {
        setPicFile(file);
        addPetPicSrcEl.src = file;
      });

      function initMap() {
        return new mapboxgl.Map({
          container: document.querySelector(".map"),
          style: "mapbox://styles/mapbox/streets-v11",
          center: [userData.selectedPet.lng, userData.selectedPet.lat],
          zoom: 13,
        });
      }
      setMapCoordinates(initMap());
    }
  }, [addPetPicEl]);

  // SE EDITAN LOS DATOS

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const editedData = {
      id: userData.selectedPet.id,
      picURL: userData.selectedPet.picURL,
      name,
      details,
      found: false,
      lng: userData.selectedPet.lng,
      lat: userData.selectedPet.lat,
    };

    if (name != "" && details != "") {
      if (picFile != undefined) {
        editedData.picURL = picFile.dataURL;
      }
      if (mapCoordinates != undefined) {
        editedData.lng = mapCoordinates.getCenter().toArray()[0];
        editedData.lat = mapCoordinates.getCenter().toArray()[1];
      }

      try {
        await editReport(editedData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // SE SETEA EL FOUND

  const HandleFoundPetClick = async (e) => {
    setFpCompDisplay(true);
  };

  const HandleFPYESClick = async (e) => {
    e.preventDefault();

    const editedData = {
      id: userData.selectedPet.id,
      picURL: userData.selectedPet.picURL,
      name: userData.selectedPet.name,
      details: userData.selectedPet.details,
      found: true,
      lng: userData.selectedPet.lng,
      lat: userData.selectedPet.lat,
    };

    try {
      await editReport(editedData);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleFPNOClick = async (e) => {
    setFpCompDisplay(false);
  };

  // SE ELIMINA EL REPORTE

  const HandleDeletedPetClick = async (e) => {
    setDpCompDisplay(true);
  };

  const HandleDPYESClick = async (e) => {
    e.preventDefault();

    try {
      await deleteReport(userData.selectedPet.id);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleDPNOClick = async (e) => {
    setDpCompDisplay(false);
  };

  return (
    <div className="general-container">
      <h1 className="edit-report-main-title">Editar reporte de mascota</h1>
      <form className="edit-report-form" onSubmit={HandleSubmit}>
        <FormInputComp
          className="name-input"
          type="text"
          name="name"
          value={name}
          textContent="NOMBRE"
          onChange={(e) => setName(e.target.value)}
        />
        <img
          className="add-pet-pic"
          src={userData.selectedPet.picURL}
          alt="upload-picture"
        />
        <div className="map-container">
          <div className="map"></div>
          <img className="pin-map" src={pinMap} alt="test-map" />
        </div>
        <p className="paragraph-02">Editar punto de referencia.</p>
        <label className="details-label">
          OBSERVACIONES
          <textarea
            className="details-input"
            name="det"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
          <p className="details-required-field">Campo obligatorio</p>
        </label>
        <ButtonComp
          className="button-save"
          color="#ff7f87"
          textContent="Guardar"
        />
      </form>
      <div className="button-container">
        <FoundPetComp
          name={userData.selectedPet.name}
          yesOnClick={HandleFPYESClick}
          noOnClick={HandleFPNOClick}
          fpDisplay={fpCompDisplay}
        />
        <ButtonComp
          className="button-found"
          color="#ff7f87"
          textContent="Reportar como encontrado"
          onClick={HandleFoundPetClick}
          buttonDisplay={fpCompDisplay}
        />
        <DeletedPetComp
          name={userData.selectedPet.name}
          yesOnClick={HandleDPYESClick}
          noOnClick={HandleDPNOClick}
          dpDisplay={dpCompDisplay}
        ></DeletedPetComp>
        <ButtonComp
          className="button-delete"
          color="#ff7f87"
          textContent="Eliminar reporte"
          onClick={HandleDeletedPetClick}
          buttonDisplay={dpCompDisplay}
        />
      </div>
    </div>
  );
}
