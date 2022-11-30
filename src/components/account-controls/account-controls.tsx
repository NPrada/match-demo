import * as React from "react";
import { useAuth } from "../context/auth-context";
interface AccountControlsProps {}
export const AccountControls: React.FC<AccountControlsProps> = () => {
  const { user } = useAuth();

  return (
    <div className="account-controls">
      <div className="account-controls-picture">
        <span className="account-controls-picture-initials">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </span>
      </div>
      <div className="text-highlighted">
        {user?.firstName} {user?.lastName}
      </div>
    </div>
  );
};
