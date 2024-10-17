import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { dataAtom } from "../atoms/data-atoms";
import { authAtom, authSelector } from "../atoms/login-atoms";

function useLogIn() {
  const navigate = useNavigate();
  const setAuthDataState = useSetRecoilState(authAtom);
  const userDataLoadable = useRecoilValueLoadable(authSelector);
  const setDataState = useSetRecoilState(dataAtom);

  useEffect(() => {
    if (userDataLoadable.state === "hasValue" && userDataLoadable.contents) {
      setDataState(userDataLoadable.contents);
      navigate("/home");
    }
  }, [userDataLoadable, navigate]);

  async function logIn(email, password) {
    setAuthDataState({ email, password });
  }

  return logIn;
}

export { useLogIn };
