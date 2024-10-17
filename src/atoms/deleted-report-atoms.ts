import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const deletedReportAtom = atom({
  key: "deleted-report-atom",
  default: "",
});

const deletedReportSelector = selector({
  key: "deleted-report-selector",
  get: async ({ get }) => {
    const petID = get(deletedReportAtom);
    console.log("atom: ", petID);

    if (petID == "") {
      return false;
    } else {
      const response = await fetch(API_BASE_URL + "/delete-report", {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: petID }),
      });

      const json = await response.json();
      console.log("json: ", json);
      return json;
    }
  },
});

export { deletedReportAtom, deletedReportSelector };
