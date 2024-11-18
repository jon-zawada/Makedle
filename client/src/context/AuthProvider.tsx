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
  handleLogin: (user: User) => Promise<AxiosResponse<{ token: string }>>;
  handleLogout: () => Promise<void>;
  setAuthToken: (state: string | null) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function handleLogin(
    user: User
  ): Promise<AxiosResponse<{ token: string }>> {
    try {
      const response = await httpService.post("/login", user);
      const token = response.data?.token;
      setAuthToken(token);
      setCurrentUser(response.data?.user);
      return response;
    } catch (error) {
      setAuthToken(null);
      setCurrentUser(null);
      return Promise.reject(error);
    }
  }

  async function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    await httpService.put(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
        setAuthToken,
      }}
    >
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
