import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import httpService from "../api/httpService";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

type User = {
  email: string;
  password: string;
  username?: string;
};

type AuthContext = {
  accessToken?: string | null;
  appUser?: User | null;
  loadingAppUser: boolean;
  handleLogin: (user: User) => Promise<AxiosResponse<{ token: string }>>;
  handleLogout: () => Promise<void>;
  setAccessToken: (state: string | null) => void;
  setAppUser: (state: User | null) => void;
  setLoadingAppUser: (state: boolean) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [appUser, setAppUser] = useState<User | null>(null);
  const [loadingAppUser, setLoadingAppUser] = useState<boolean>(true);


  async function handleLogin(
    user: User
  ): Promise<AxiosResponse<{ token: string }>> {
    setLoadingAppUser(true);
    try {
      const response = await httpService.post("/login", user);
      const token = response.data?.token;
      setAccessToken(token);
      setAppUser(response.data?.user);
      toast.success("Login successful");
      return response;
    } catch (error) {
      setAccessToken(null);
      setAppUser(null);
      toast.error("Login failed");
      return Promise.reject(error);
    } finally {
      setLoadingAppUser(false);
    }
  }

  async function handleLogout() {
    setAccessToken(null);
    setAppUser(null);
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
        appUser,
        loadingAppUser,
        handleLogin,
        handleLogout,
        setAccessToken,
        setAppUser,
        setLoadingAppUser
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
