import * as React from "react";
import { formatDate } from "../../utils";
import type { ReportParams } from "../../utils/api-client";
import {
  useGenerateReport,
  useGetGateways,
  useGetProjects,
} from "../../utils/api-client";
import { Button } from "../button/button";
import { useAuth } from "../context/auth-context";

import { DatePicker } from "../date-picker/date-picker";
import { Listbox } from "../listbox/listbox";
import { NoReports } from "../report/no-reports";
import { Report } from "../report/report";
import { ReportsHeader } from "../reports-header/reports-header";
interface DashboardPageProps {}

const minMaxDates = {
  from: "2021-01-01",
  to: "2021-12-31",
} as const;

export const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [filters, setFilters] = React.useState<ReportParams>(minMaxDates);

  const { user } = useAuth();
  const { data: projects, isError: isErrorProjects } = useGetProjects();
  const { data: gateways, isError: isErrorGatways } = useGetGateways();
  const reportMutation = useGenerateReport(filters, projects, gateways);

  const projectOptions =
    projects
      ?.filter((ev) => ev.userIds.includes(user?.userId || ""))
      .map((ev) => ({ id: ev.projectId, name: ev.name })) || [];

  const gatewayOptions =
    gateways
      ?.filter((ev) => ev.userIds.includes(user?.userId || ""))
      .map((ev) => ({ id: ev.gatewayId, name: ev.name })) || [];

  const fetchError =
    isErrorProjects || isErrorGatways || reportMutation.isError;

  return (
    <>
      <ReportsHeader
        controls={[
          <Listbox
            key={1}
            options={[{ id: "1", name: "All projects" }, ...projectOptions]}
            onSelect={(val) => {
              if (val.id === "1") {
                setFilters({ ...filters, projectId: undefined });
              } else {
                setFilters({ ...filters, projectId: val.id });
              }
            }}
          />,
          <Listbox
            key={2}
            options={[{ id: "1", name: "All gateways" }, ...gatewayOptions]}
            onSelect={(val) => {
              if (val.id === "1") {
                setFilters({ ...filters, gatewayId: undefined });
              } else {
                setFilters({ ...filters, gatewayId: val.id });
              }
            }}
          />,
          <DatePicker
            key={3}
            defaultValue="From date"
            defaultMonth={new Date(filters.from)}
            fromDate={new Date(minMaxDates.from)}
            toDate={new Date(filters.to)}
            onSelect={(val) => {
              setFilters({ ...filters, from: formatDate(val) });
            }}
          />,
          <DatePicker
            key={4}
            defaultValue="To date"
            defaultMonth={new Date(filters.from)}
            fromDate={new Date(filters.from)}
            toDate={new Date(minMaxDates.to)}
            onSelect={(val) => {
              setFilters({ ...filters, to: formatDate(val) });
            }}
          />,
          <Button
            key={5}
            onClick={() => {
              reportMutation.mutate(filters);
            }}
          >
            Generate Report
          </Button>,
        ]}
      />
      {fetchError && <NoReports isError />}
      {!fetchError && !reportMutation.isLoading && (
        <Report reportData={reportMutation.data} />
      )}
    </>
  );
};
