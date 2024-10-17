import { useSetRecoilState } from "recoil";
import { newReportAtom } from "../atoms/set-new-report-atoms";

function useNewReport() {
  const setNewReportState = useSetRecoilState(newReportAtom);

  async function newReport(newReportData) {
    setNewReportState(newReportData);
  }

  return newReport;
}

export { useNewReport };
