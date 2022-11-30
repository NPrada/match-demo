import * as React from "react";
import { formatNumber } from "../../utils";
import { ExpandibleItem } from "../expandible-item/expandible-item";
import { ReportTable } from "../report-table/report-table";
import type { FullReport } from "./report";
import { generateListData } from "./utils";

interface ReportItemsListProps {
  reportData: Required<FullReport>;
}
export const ReportItemsList: React.FC<ReportItemsListProps> = ({
  reportData,
}) => {

  const listData = generateListData(reportData);

  return (
    <>
      {listData.map((listItem, i) => {
        if (
          reportData.params.gatewayId != null &&
          reportData.params.projectId != null
        ) {
          return (
            <ReportTable
              key={i}
              headers={listItem.headers}
              contents={listItem.tableContents}
            />
          );
        }

        return (
          <ExpandibleItem
            key={i}
            titleFragment={
              <>
                <h3 className="text-highlighted">{listItem.name}</h3>
                <h3 className="text-highlighted">
                  TOTAL: {formatNumber(listItem.amount)}
                </h3>
              </>
            }
          >
            <ReportTable
              headers={listItem.headers}
              contents={listItem.tableContents}
            />
          </ExpandibleItem>
        );
      })}
    </>
  );
};
