import React from "react";
import type { PieLabel } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { FullReport } from "../report/report";
import { ReportSurface } from "../report/report-surface";
import { ReportTotal } from "../report/report-total";
import { getGatewayName, getProjectName } from "../report/utils";

const COLORS = ["#A259FF", "#6497B1", "#FFC107", "#F24E1E"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel: PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface ReportDonutChartProps {
  reportData: Required<FullReport>;
}

export const ReportDonutChart: React.FC<ReportDonutChartProps> = ({
  reportData,
}) => {
  const isGatewayList =
    (reportData.params.projectId != null &&
      reportData.params.gatewayId != null) ||
    (reportData.params.projectId != null &&
      reportData.params.gatewayId == null);

  const idField = isGatewayList ? "gatewayId" : "projectId";

  const dataAgg: Record<string, { name: string; amount: number; id: string }> =
    {};

  let totAmount = 0;
  reportData.data.forEach((el) => {
    const id = el[idField];

    if (dataAgg[id] == null) {
      dataAgg[id] = {
        id: id,
        name:
          (isGatewayList
            ? getGatewayName(reportData.gateways, el.gatewayId)
            : getProjectName(reportData.projects, el.projectId)) || "",
        amount: 0,
      };
    }

    dataAgg[id]!.amount =
      Math.round((dataAgg[id]!.amount + el.amount) * 100) / 100;

    totAmount = Math.round((totAmount + el.amount) * 100) / 100;
  });

  const data = Object.values(dataAgg);

  return (
    <div className="donut-chart">
      <ReportSurface variant="dark" size="m" className="donut-chart-legend">
        {data.map((entry, i) => (
          <div key={i} className="legend-item">
            <div
              className="legend-color-pick"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <p className="text-highlighted">{entry.name}</p>
          </div>
        ))}
      </ReportSurface>
      <div className="donut-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={60}
              outerRadius={130}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ReportTotal reportData={reportData} />
    </div>
  );
};
