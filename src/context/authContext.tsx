import { createContext, useContext } from "react";

interface AuthContextType {
  user: String | null;
  isLogin: boolean;
  login: (user: String | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = AuthContext.Provider;
