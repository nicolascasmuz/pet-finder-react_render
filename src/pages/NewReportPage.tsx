import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormInputComp } from "../components/FormInputComp";
import { ButtonComp } from "../components/ButtonComp";
import { useNewReport } from "../hooks/useNewReport";
import { dataSelector } from "../atoms/data-atoms";
import { useRecoilValue } from "recoil";
import { Dropzone } from "dropzone";
import mapboxgl from "mapbox-gl";
import uploadPic from "../resources/upload-pic.png";
import pinMap from "../resources/pin-map.png";
import "mapbox-gl/dist/mapbox-gl.css";
import "./new-report-page.css";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibmljb2xhc2Nhc211eiIsImEiOiJjbGlnazg2cjExZTdvM21tcWl6eGU5bDM0In0.EtaC4N7nb_NuwfddaKZaow";
mapboxgl.accessToken = MAPBOX_TOKEN;

export function NewReportPage() {
  const navigate = useNavigate();
  const newReport = useNewReport();
  const userData = useRecoilValue(dataSelector);

  const addPetPicEl = document.querySelector(".add-pet-pic") as HTMLElement;
  const addPetPicSrcEl = document.querySelector(
    ".add-pet-pic"
  ) as HTMLSourceElement;

  let picFile;
  let mapCoordinates;

  useEffect(() => {
    if (addPetPicEl) {
      let myDropzone = new Dropzone(addPetPicEl, {
        url: "/file/post",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", (file) => {
        picFile = file;
        addPetPicSrcEl.src = file;
      });

      function initMap() {
        return new mapboxgl.Map({
          container: document.querySelector(".map"),
          style: "mapbox://styles/mapbox/streets-v11",
          center: [userData.lng, userData.lat],
          zoom: 13,
        });
      }
      mapCoordinates = initMap();
    }
  }, [addPetPicEl]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const nameValue = e.target["name"].value;
    const detailsValue = e.target["det"].value;

    const newData = {
      userId: userData.userId,
      picURL: "",
      name: nameValue,
      details: detailsValue,
      lng: mapCoordinates.getCenter().toArray()[0],
      lat: mapCoordinates.getCenter().toArray()[1],
      ownerEmail: userData.email,
      ownerName: userData.nickname,
    };

    if (nameValue != "" && picFile != undefined && detailsValue != "") {
      if (picFile != undefined) {
        newData.picURL = picFile.dataURL;
      }

      try {
        await newReport(newData);
        console.log("newData: ", newData);
      } catch (error) {
        console.error(error);
      } finally {
        navigate("/new-reported-pet");
      }
    }
  };

  return (
    <div className="general-container">
      <h1 className="new-report-main-title">Reportar mascota</h1>
      <p className="paragraph-01">
        Ingresá la siguiente información para realizar el reporte de la mascota
      </p>
      <form className="new-report-form" onSubmit={HandleSubmit}>
        <FormInputComp
          className="name-input"
          type="text"
          name="name"
          textContent="NOMBRE"
        />
        <img className="add-pet-pic" src={uploadPic} alt="upload-picture" />
        <div className="map-container">
          <div className="map"></div>
          <img className="pin-map" src={pinMap} alt="test-map" />
        </div>
        <p className="paragraph-02">
          Buscá un punto de referencia para reportar la mascota. Por ejemplo, la
          ubicación donde lo viste por última vez.
        </p>
        <label className="details-label">
          OBSERVACIONES
          <textarea className="details-input" name="det"></textarea>
          <p className="details-required-field">Campo obligatorio</p>
        </label>
        <ButtonComp
          className="button-report"
          color="#ff7f87"
          textContent="Reportar mascota"
        />
        <Link to="/home" className="button-cancel">
          <ButtonComp
            className="button-cancel"
            color="#ff7f87"
            textContent="Cancelar"
          />
        </Link>
      </form>
    </div>
  );
}
