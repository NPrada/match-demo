import * as React from "react";
import { formatNumber } from "../../utils";
import type { FullReport } from "./report";
import { ReportSurface } from "./report-surface";
import { getAmount } from "./utils";

export const ReportTotal: React.FC<{ reportData: Required<FullReport> }> = ({
  reportData,
}) => (
  <ReportSurface variant="dark" size="m" className="report-total report-items-list">
    <p className="text-highlighted">
      TOTAL |{" "}
      {formatNumber(
        getAmount(reportData.data, {
          gatewayId: reportData.params.gatewayId,
          projectId: reportData.params.projectId,
        })
      )}
    </p>
  </ReportSurface>
);
