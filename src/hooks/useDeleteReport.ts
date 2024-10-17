import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import {
  deletedReportAtom,
  deletedReportSelector,
} from "../atoms/deleted-report-atoms";

function useDeleteReport() {
  const navigate = useNavigate();
  const setDeletedReportState = useSetRecoilState(deletedReportAtom);
  const deletedReportLoadable = useRecoilValueLoadable(deletedReportSelector);

  useEffect(() => {
    if (
      deletedReportLoadable.state === "hasValue" &&
      deletedReportLoadable.contents
    ) {
      navigate("/deleted-pet");
    }
  }, [deletedReportLoadable]);

  async function deleteReport(petID) {
    setDeletedReportState(petID);
  }

  return deleteReport;
}

export { useDeleteReport };
