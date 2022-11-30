import * as React from "react";
import Image from "next/image";
import noreports from "../../../public/assets/no-reports-splash.svg";

interface NoReportsProps {
  isError?: boolean;
}
export const NoReports: React.FC<NoReportsProps> = ({ isError = false }) => {

  return (
    <div className="no-report">
      <h2> {!isError ? "No reports" : "Error fetching data"}</h2>
      <p>
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </p>
      <Image src={noreports} alt="no reports" />
    </div>
  );
};
