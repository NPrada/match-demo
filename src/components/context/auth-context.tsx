import * as React from "react";
import type { UserData } from "../../utils/api-client";
import { useGetUsers } from "../../utils/api-client";

interface AuthContextType {
  user: UserData | null;
}

const initialContextData: AuthContextType = {
  user: null,
};

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProps {
  initialContext?: AuthContextType;
}

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<AuthContextProps>) => {
  const { data } = useGetUsers();

  const contextVal: AuthContextType =
    data != null && data[0] != null ? { user: data[0] } : initialContextData;

  return (
    <AuthContext.Provider value={contextVal}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
