import React, { useEffect } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { dataSelector } from "../atoms/data-atoms";
import { useRecoilValue } from "recoil";
import { Dropzone } from "dropzone";
import { useEditData } from "../hooks/useEditData";
import "./edit-pic-page.css";

export function EditPicPage() {
  const editData = useEditData();
  const userData = useRecoilValue(dataSelector);

  const addProfilePicEl = document.querySelector(".add-profile-pic");
  const addProfilePicSrcEl = document.querySelector(
    ".add-profile-pic"
  ) as HTMLSourceElement;

  let picFile;

  useEffect(() => {
    if (addProfilePicEl) {
      let myDropzone = new Dropzone(addProfilePicEl, {
        url: "/file/post",
        autoProcessQueue: false,
      });

      myDropzone.on("addedfile", (file) => {
        picFile = file;
        addProfilePicSrcEl.src = file;
      });
    }
  }, [addProfilePicEl]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      userId: userData.userId,
      picURL: userData.picURL,
      nickname: userData.nickname,
      email: userData.email,
      address: userData.address,
      location: userData.location,
      lng: userData.lng,
      lat: userData.lat,
    };

    if (picFile != undefined) {
      newData.picURL = picFile.dataURL;
      try {
        await editData(newData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="general-container">
      <h1 className="main-title">Cambiar foto</h1>
      <form className="modify-data-form dropzone" onSubmit={HandleSubmit}>
        <center>
          <img
            className="add-profile-pic"
            src={userData.picURL}
            alt="add-profile-pic"
          />
        </center>
        <div className="button-guardar">
          <ButtonComp color="#ff7f87" textContent="Guardar" />
        </div>
      </form>
    </div>
  );
}
