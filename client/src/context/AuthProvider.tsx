import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import httpService from "../api/httpService";
import { AxiosResponse } from "axios";

type User = {
  email: string;
  password: string;
};

type AuthContext = {
  authToken?: string | null;
  currentUser?: User | null;
  handleLogin: (user: User) => Promise<AxiosResponse<any, any>>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>();
  // const [currentUser, setCurrentUser] = useState<User | null>();
  async function handleLogin(user: User): Promise<AxiosResponse<any, any>> {
    try {
      const response = await httpService.post("/login", user);
      const token = response.data?.token;
      setAuthToken(token);
      return response;
    } catch (error) {
      setAuthToken(null);
      return Promise.reject(error);
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    // setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ authToken, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of a AuthProvider");
  }

  return context;
}
