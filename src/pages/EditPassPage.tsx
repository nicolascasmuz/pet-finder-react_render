import React from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import { getSHA256ofString } from "../../backend/lib/sha256";
import { useRecoilValue } from "recoil";
import { useEditPass } from "../hooks/useEditPass";
import { dataSelector } from "../atoms/data-atoms";
import "./edit-pass-page.css";

export function EditPassPage() {
  const editPass = useEditPass();
  const userData = useRecoilValue(dataSelector);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target["password"].value;
    const newPassword = e.target["new-password"].value;
    const repeatNewPassword = e.target["repeat-new-password"].value;

    if (password != "" || newPassword != "" || repeatNewPassword != "") {
      if (
        getSHA256ofString(password) == userData.password &&
        newPassword == repeatNewPassword
      ) {
        const newPass = {
          userId: userData.userId,
          password: newPassword,
        };

        try {
          await editPass(newPass);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="general-container">
      <h1 className="main-title">Modificar contraseña</h1>
      <form className="modify-pass-form" onSubmit={HandleSubmit}>
        <FormInputComp
          className="current-pass"
          type="password"
          name="password"
          textContent="CONTRASEÑA ACTUAL"
        />
        <FormInputComp
          className="new-pass"
          type="password"
          name="new-password"
          textContent="CONTRASEÑA NUEVA"
        />
        <FormInputComp
          className="repeat-new-pass"
          type="password"
          name="repeat-new-password"
          textContent="REPETIR CONTRASEÑA NUEVA"
        />
        <div className="button-guardar"></div>
        <ButtonComp color="#ff7f87" textContent="Guardar" />
      </form>
    </div>
  );
}
