import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { dataAtom, dataSelector } from "../atoms/data-atoms";
import {
  missingPetsAtom,
  missingPetsSelector,
} from "../atoms/missing-pets-atoms";
import { petsByRadiusAtom } from "../atoms/pets-by-radius-atoms";

function useSelectedPet() {
  const navigate = useNavigate();
  const missingPetsState = useSetRecoilState(missingPetsAtom);
  const setPetsByRadiusState = useSetRecoilState(petsByRadiusAtom);
  const missingPetsLoadable = useRecoilValueLoadable(missingPetsSelector);
  const setDataState = useSetRecoilState(dataAtom);
  const stateData = useRecoilValue(dataSelector);

  const emptyMissingPetsAtom = {
    userId: "",
    name: "",
    found: "",
    _geoloc: { lng: "", lat: "" },
    objectID: "",
  };

  const emptyPetsByRadiusAtom = {
    userID: "",
    lat: "",
    lng: "",
    distance: "",
  };

  useEffect(() => {
    if (
      missingPetsLoadable.state === "hasValue" &&
      missingPetsLoadable.contents
    ) {
      setDataState((prevState) => ({
        ...prevState,
        selectedPet: missingPetsLoadable.contents,
      }));
      navigate("/selected-pet-map");
      missingPetsState(emptyMissingPetsAtom);
      setPetsByRadiusState(emptyPetsByRadiusAtom);
    }
  }, [missingPetsLoadable]);

  async function selectMyReportedPet(petId) {
    const foundPet = stateData.myReportedPets.find((p: any) => {
      return p.id == petId;
    });

    setDataState((prevState) => ({
      ...prevState,
      selectedPet: foundPet ? foundPet : {},
    }));
  }

  async function selectMissingPet(missingPet) {
    missingPetsState(missingPet);
  }

  async function deleteSelectedPet() {
    console.log("deleteSelectedPet");
    setDataState((prevState) => ({
      ...prevState,
      selectedPet: [],
    }));
  }

  return { selectMyReportedPet, selectMissingPet, deleteSelectedPet };
}

export { useSelectedPet };
