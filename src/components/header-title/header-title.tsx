import * as React from "react";
interface HeaderTitleProps {
  title: string;
  subTitle: string;
}
export const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  subTitle,
}) => {
  return (
    <div className="header-title">
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
};
