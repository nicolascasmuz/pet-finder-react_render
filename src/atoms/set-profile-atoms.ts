import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const profileAtom = atom({
  key: "profile-atom",
  default: {
    email: "",
    password: "",
    address: "",
    location: "",
    lat: "",
    lng: "",
  },
});

const profileSelector = selector({
  key: "profile-selector",
  get: async ({ get }) => {
    const profileData = get(profileAtom);
    console.log("set-profile-atoms (profileData): ", profileData);

    if (profileData.email == "" && profileData.password == "") {
      return false;
    } else {
      const response = await fetch(API_BASE_URL + "/create-profile", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization:
            "Bearer " + profileData.email + " " + profileData.password,
        },
        body: JSON.stringify(profileData),
      });
      const json = await response.json();
      const data = await json.newProfile;
      console.log("set-profile-atoms (data): ", data);

      return data;
    }
  },
});

export { profileAtom, profileSelector };
