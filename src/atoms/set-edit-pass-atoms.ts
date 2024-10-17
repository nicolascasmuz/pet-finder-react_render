import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const editPassAtom = atom({
  key: "edit-pass-atom",
  default: {
    userId: "",
    password: "",
  },
});

const editPassSelector = selector({
  key: "edit-pass-selector",
  get: async ({ get }) => {
    const newPass = get(editPassAtom);
    console.log("set-edit-pass-atoms (newPass): ", newPass);

    if (newPass.userId == "") {
      return false;
    } else {
      const response = await fetch(API_BASE_URL + "/update-pass", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newPass),
      });

      const json = await response.json();
      console.log("set-edit-pass-atoms (json): ", json);
      return json;
    }
  },
});

export { editPassAtom, editPassSelector };
