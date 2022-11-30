import * as React from "react";
interface ReportTableProps {
  headers: string[];
  contents: string[][];
}

export const ReportTable: React.FC<ReportTableProps> = ({
  headers,
  contents,
}) => {
  return (
    <div className="report-table">
      <div className="report-table-row">
        {headers.map((header) => (
          <div key={header} className="report-table-cell truncate-text">
            {header}
          </div>
        ))}
      </div>

      {contents.map((row, i) => (
        <div key={i} className="report-table-row">
          {row.map((item) => (
            <div key={item} className="report-table-cell truncate-text">
              {item}
            </div>
          ))}
        </div>
      ))}
      <div></div>
    </div>
  );
};
