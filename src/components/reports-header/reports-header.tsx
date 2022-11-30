import * as React from "react";
import { HeaderTitle } from "../header-title/header-title";
interface ReportsHeaderProps {
  controls: React.ReactNode[];
}
export const ReportsHeader: React.FC<ReportsHeaderProps> = ({ controls }) => {
  return (
    <div className="reports-header">
      <HeaderTitle
        title="Reports"
        subTitle="Easily generate a report of your transactions"
      />
      <div className="reports-header-controls">
        {controls.map((el, i) => (
          <div key={i}>{el}</div>
        ))}
      </div>
    </div>
  );
};
