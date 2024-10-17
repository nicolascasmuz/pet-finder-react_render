import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import { editPassAtom, editPassSelector } from "../atoms/set-edit-pass-atoms";

function useEditPass() {
  const navigate = useNavigate();
  const setEditDataState = useSetRecoilState(editPassAtom);
  const editPassLoadable = useRecoilValueLoadable(editPassSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  useEffect(() => {
    if (editPassLoadable.state === "hasValue" && editPassLoadable.contents) {
      const newPassData = {
        userId: stateData.userId,
        picURL: stateData.picURL,
        nickname: stateData.nickname,
        email: stateData.email,
        password: editPassLoadable.contents.password,
        address: stateData.address,
        location: stateData.location,
        lat: stateData.lat,
        lng: stateData.lng,
        newUser: stateData.newUser,
        selectedPet: stateData.selectedPet,
        petsByRadius: stateData.petsByRadius,
        myReportedPets: stateData.myReportedPets,
      };
      setDataState(newPassData);
    }
  }, [editPassLoadable, navigate]);

  async function editPass(newPass) {
    setEditDataState(newPass);
  }

  return editPass;
}

export { useEditPass };
