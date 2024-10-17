import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { dataSelector } from "../atoms/data-atoms";
import { useNavigate } from "react-router-dom";
import { useSendMail } from "../hooks/useSendMail";
import { useSelectedPet } from "../hooks/useSelectedPet";
import exitCross from "../resources/exit-cross.png";
import { ReportFormComp } from "../components/ReportFormComp";
import { SentInfoComp } from "../components/SentInfoComp";
import "./missing-pet-card-comp.css";

function MissingPetCardComp(props) {
  const userData = useRecoilValue(dataSelector);
  const navigate = useNavigate();
  const { deleteSelectedPet } = useSelectedPet();
  const sendMail = useSendMail();

  const [reportFormDisplay, setReportFormDisplay] = useState(false);
  const [sentInfoDisplay, setSentInfoDisplay] = useState(false);

  const handleExitButtonClick = async () => {
    console.log("exit anda");
    try {
      await deleteSelectedPet();
      navigate("/map");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReportButtonClick = () => {
    setReportFormDisplay(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const infoValue = e.target["info"].value;

    const mail = {
      myEmail: userData.email,
      myName: userData.nickname,
      ownerEmail: userData.selectedPet[0].ownerEmail,
      ownerName: userData.selectedPet[0].ownerName,
      missingPetName: userData.selectedPet[0].name,
      info: infoValue,
    };

    console.log("mail: ", mail);

    try {
      await sendMail(mail);
      setSentInfoDisplay(true);
      setReportFormDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comp-container">
      <button className="exit-button" onClick={handleExitButtonClick}>
        <img className="exit-cross" src={exitCross} alt="exit-cross" />
      </button>
      <ReportFormComp
        reportFormDisplay={reportFormDisplay}
        onSubmit={handleSubmit}
      />
      <SentInfoComp sentInfoDisplay={sentInfoDisplay} />
      <div
        className="card__container"
        style={{
          display: reportFormDisplay || sentInfoDisplay ? "none" : "grid",
        }}
      >
        <img className="card__img" src={props.picURL} alt="pet-pic" />
        <div className="card__name-button">
          <h3 className="card__name">{props.name}</h3>
          <button className="card__button" onClick={handleReportButtonClick}>
            Reportar
          </button>
        </div>
        <p className="card__details">{props.details}</p>
      </div>
    </div>
  );
}

export { MissingPetCardComp };
