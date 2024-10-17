import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const reportedPetsAtom = atom({
  key: "reported-pets-atom",
  default: {
    userId: "",
  },
});

const reportedPetsSelector = selector({
  key: "reported-pets-selector",
  get: async ({ get }) => {
    const reportedPetsValues = get(reportedPetsAtom);
    console.log(
      "reported-pets-atoms (reportedPetsValues): ",
      reportedPetsValues
    );

    if (reportedPetsValues.userId) {
      const response = await fetch(
        API_BASE_URL + "/reported-pets/" + reportedPetsValues.userId,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const json = await response.json();
      console.log("reported-pets-atoms (json): ", json);
      return json;
    } else {
      return [];
    }
  },
});

export { reportedPetsAtom, reportedPetsSelector };
