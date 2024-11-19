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
  accessToken?: string | null;
  currentUser?: User | null;
  handleLogin: (user: User) => Promise<AxiosResponse<{ token: string }>>;
  handleLogout: () => Promise<void>;
  setAccessToken: (state: string | null) => void;
  setCurrentUser: (state: User | null) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function handleLogin(
    user: User
  ): Promise<AxiosResponse<{ token: string }>> {
    try {
      const response = await httpService.post("/login", user);
      const token = response.data?.token;
      setAccessToken(token);
      setCurrentUser(response.data?.user);
      return response;
    } catch (error) {
      setAccessToken(null);
      setCurrentUser(null);
      return Promise.reject(error);
    }
  }

  async function handleLogout() {
    setAccessToken(null);
    setCurrentUser(null);
    await httpService.put(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentUser,
        handleLogin,
        handleLogout,
        setAccessToken,
        setCurrentUser
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
