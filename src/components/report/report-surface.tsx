import * as React from "react";
interface ReportSurfaceProps {
  size: "l" | "m" | "s";
  variant?: "dark" | "light";
  className?: string;
  children?: React.ReactNode;
}

export const ReportSurface: React.FC<ReportSurfaceProps> = ({
  children,
  className,
  variant = "light",
  size,
}) => (
  <div
    className={`report-surface report-surface-size--${size} report-surface${
      variant === "dark" ? "--dark" : "--light"
    } ${className ? className : ""}`}
  >
    {children}
  </div>
);
