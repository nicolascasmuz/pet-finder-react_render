import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const missingPetsAtom = atom({
  key: "missing-pets-atom",
  default: {
    userId: "",
    name: "",
    found: "",
    _geoloc: { lng: "", lat: "" },
    objectID: "",
  },
});

const missingPetsSelector = selector({
  key: "missing-pets-selector",
  get: async ({ get }) => {
    const algoliaResult = get(missingPetsAtom);

    if (algoliaResult.objectID) {
      const response = await fetch(API_BASE_URL + "/every-missing-pet");
      const json = await response.json();

      const foundMp = json.filter((mp) => {
        return mp.id == Number(algoliaResult.objectID);
      });

      return foundMp;
    }
  },
});

export { missingPetsAtom, missingPetsSelector };
