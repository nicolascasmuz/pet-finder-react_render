import { atom, selector } from "recoil";

function loadInitialState() {
  try {
    const localData = localStorage.getItem("saved-state");
    if (!localData) {
      return {
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
        selectedPet: {},
        petsByRadius: [],
        myReportedPets: [],
      };
    } else {
      return {
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
        selectedPet: {},
        petsByRadius: [],
        myReportedPets: [],
      };
    }
  } catch (error) {
    console.error("Error al cargar el estado inicial de localStorage: ", error);
    return {
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
  }
}

const dataAtom = atom({
  key: "data-atom",
  default: loadInitialState(),
});

const dataSelector = selector({
  key: "data-selector",
  get: ({ get }) => {
    const userProfile = get(dataAtom);
    localStorage.setItem("saved-state", JSON.stringify(userProfile));
    return userProfile;
  },
  set: ({ set }, newValue) => {
    set(dataAtom, newValue);
    localStorage.setItem("saved-state", JSON.stringify(newValue));
  },
});

export { dataAtom, dataSelector };
