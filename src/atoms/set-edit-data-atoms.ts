import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const editDataAtom = atom({
  key: "edit-data-atom",
  default: {
    userId: "",
    picURL: "",
    nickname: "",
    email: "",
    address: "",
    location: "",
  },
});

const editDataSelector = selector({
  key: "edit-data-selector",
  get: async ({ get }) => {
    const editedData = get(editDataAtom);

    if (editedData.userId == "") {
      return false;
    } else {
      const response = await fetch(API_BASE_URL + "/profile", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      const json = await response.json();
      return json;
    }
  },
});

export { editDataAtom, editDataSelector };
