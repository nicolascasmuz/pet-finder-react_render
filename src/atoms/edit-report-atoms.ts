import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const editReportAtom = atom({
  key: "edit-report-atom",
  default: {
    id: "",
    picURL: "",
    name: "",
    details: "",
    found: "",
    lng: "",
    lat: "",
  },
});

const editReportSelector = selector({
  key: "edit-report-selector",
  get: async ({ get }) => {
    const editedData = get(editReportAtom);

    if (editedData.id == "") {
      return false;
    } else {
      const response = await fetch(API_BASE_URL + "/report", {
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

export { editReportAtom, editReportSelector };
