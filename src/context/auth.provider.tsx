import { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext({});

interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
