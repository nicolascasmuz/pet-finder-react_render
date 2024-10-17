import { atom, selector } from "recoil";
import { API_BASE_URL } from "../API_BASE_URL";

const signinAtom = atom({
  key: "signin-atom",
  default: {
    email: "",
    password: "",
  },
});

const signinSelector = selector({
  key: "signin-selector",
  get: async ({ get }) => {
    const emailPassValues = get(signinAtom);

    if (emailPassValues.email && emailPassValues.password) {
      const response = await fetch(API_BASE_URL + "/sign-up", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailPassValues.email,
          password: emailPassValues.password,
        }),
      });
      const json = await response.json();
      const data = json.createdUser;

      return { data, emailPassValues };
    } else {
      return false;
    }
  },
});

export { signinAtom, signinSelector };
