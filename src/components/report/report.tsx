import * as React from "react";
import type {
  GateawayData,
  ProjectData,
  ReportItem,
  ReportParams,
} from "../../utils/api-client";
import { ReportDonutChart } from "../report-donut-chart/report-donut-chart";
import { NoReports } from "./no-reports";
import { ReportBreadcrumb } from "./report-breadcrumb";
import { ReportItemsList } from "./report-items-list";
import { ReportSurface } from "./report-surface";
import { ReportTotal } from "./report-total";

export interface FullReport {
  data?: ReportItem[];
  params: ReportParams;
  projects: ProjectData[];
  gateways: GateawayData[];
}

export interface ReportProps {
  reportData?: FullReport;
}

export const Report: React.FC<ReportProps> = ({ reportData }) => {
  if (reportData?.data == null || reportData?.data.length === 0) {
    return <NoReports isError={false} />;
  }
  const gatewayId = reportData.params.gatewayId;
  const projectId = reportData.params.projectId;

  const shouldShowChart =
    (gatewayId && !projectId) || (!gatewayId && projectId);

  return (
    <div className="report">
      <div className="report-panel-details">
        <ReportSurface variant="dark" size="m" className="report-items-list">
          <ReportBreadcrumb reportData={reportData} />
          <ReportItemsList reportData={reportData as Required<FullReport>} />
        </ReportSurface>
        {!shouldShowChart && (
          <ReportTotal reportData={reportData as Required<FullReport>} />
        )}
      </div>

      {shouldShowChart && (
        <ReportDonutChart reportData={reportData as Required<FullReport>} />
      )}
    </div>
  );
};
