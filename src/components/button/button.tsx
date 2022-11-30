import * as React from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button hoverable" onClick={onClick}>
      {children}
    </button>
  );
};
