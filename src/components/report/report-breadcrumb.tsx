import * as React from "react";
import { FullReport } from "./report";

export const ReportBreadcrumb: React.FC<{ reportData: FullReport }> = ({
  reportData,
}) => {
  const selectedProject =
    reportData.params.projectId != null
      ? reportData.projects.find(
          (p) => p.projectId === reportData.params.projectId
        )?.name
      : "All Projects";

  const selectedGateway =
    reportData.params.gatewayId != null
      ? reportData.gateways.find((g) =>
          g.gatewayId.includes(reportData.params.gatewayId || "")
        )?.name
      : "All Gateways";

  return (
    <p className="report-breadcrumb text-highlighted">
      {selectedProject} | {selectedGateway}
    </p>
  );
};
