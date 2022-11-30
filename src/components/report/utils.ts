import { formatNumber } from "../../utils";
import type {
  GateawayData,
  ProjectData,
  ReportItem,
} from "../../utils/api-client";
import type { FullReport } from "./report";

interface AggFilters {
  projectId?: string;
  gatewayId?: string;
}

export const getFilteredItems = (
  allItems: ReportItem[],
  filters: AggFilters
) => {
  return allItems.filter((el) => {
    return Object.keys(filters).every((filterField) => {
      const typedField = filterField as keyof typeof filters;
      if (filters[typedField]) {
        return el[typedField] === filters[typedField];
      }
      return true;
    });
  });
};

export const getAmount = (allItems: ReportItem[], filters: AggFilters) => {
  const items = getFilteredItems(allItems, filters);

  return items.reduce((r, el) => Math.round((r + el.amount) * 100) / 100, 0);
};

export const getGatewayName = (gateways: GateawayData[], id: string) =>
  gateways.find((el) => el.gatewayId === id)?.name;

export const getProjectName = (projects: ProjectData[], id: string) =>
  projects.find((el) => el.projectId === id)?.name;

interface ListData {
  name: string;
  amount: number;
  headers: string[];
  tableContents: string[][];
}

export function generateListData(reportData: Required<FullReport>): ListData[] {
  const listData: ListData[] = [];

  const isGatewayList =
    (reportData.params.projectId != null &&
      reportData.params.gatewayId != null) ||
    (reportData.params.projectId != null &&
      reportData.params.gatewayId == null);

  const idField = isGatewayList ? "gatewayId" : "projectId";

  const listItems = isGatewayList
    ? reportData.gateways
    : reportData.projects;

  listItems.forEach((item) => {
    const itemFilter = {
      projectId: reportData.params.projectId,
      [idField]: (item as any)[idField],
    };

    const transList = getFilteredItems(reportData.data, itemFilter);

    if (transList.length > 0) {
      listData.push({
        name: item.name,
        amount: getAmount(reportData.data, itemFilter),
        headers: [
          "Date",
          ...(isGatewayList ? [] : ["Gateway"]),
          "Transaction ID",
          "Amount",
        ],
        tableContents: transList
          .sort((a, b) => (b.created > a.created ? 1 : -1))
          .map((trans) => [
            trans.created.replaceAll("-", "/"),
            ...(isGatewayList
              ? []
              : [getGatewayName(reportData.gateways, trans.gatewayId) || ""]),
            trans.paymentId,
            formatNumber(trans.amount),
          ]),
      });
    }
  });

  return listData;
}
