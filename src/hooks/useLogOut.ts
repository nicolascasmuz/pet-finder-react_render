import { useSetRecoilState } from "recoil";
import { dataAtom } from "../atoms/data-atoms";

function useLogOut() {
  const setDataState = useSetRecoilState(dataAtom);

  function logOut() {
    const emptyData = {
      userId: "",
      picURL: "",
      nickname: "",
      email: "",
      password: "",
      address: "",
      location: "",
      lat: "",
      lng: "",
      newUser: "",
      selectedPet: "",
      petsByRadius: [],
      myReportedPets: [],
    };
    setDataState(emptyData);
  }

  return logOut;
}

export { useLogOut };
