import { useEffect } from "react";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { dataAtom } from "../atoms/data-atoms";
import {
  reportedPetsAtom,
  reportedPetsSelector,
} from "../atoms/reported-pets-atoms";

function useReportedPets() {
  const setReportedPetsState = useSetRecoilState(reportedPetsAtom);
  const reportedPetsLoadable = useRecoilValueLoadable(reportedPetsSelector);
  const setDataState = useSetRecoilState(dataAtom);

  useEffect(() => {
    if (
      reportedPetsLoadable.state === "hasValue" &&
      reportedPetsLoadable.contents
    ) {
      setDataState((prevState) => ({
        ...prevState,
        myReportedPets: reportedPetsLoadable.contents,
      }));
    }
  }, [reportedPetsLoadable]);

  async function reportedPets(userId) {
    setReportedPetsState({ userId });
  }

  return reportedPets;
}

export { useReportedPets };
