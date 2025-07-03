import { useEffect } from "react";
import httpService from "./httpService";
import { useAuth } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

const useHttpService = () => {
  const { accessToken } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = httpService.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = httpService.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?._retry) {
          prevRequest._retry = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return httpService(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpService.interceptors.request.eject(requestIntercept);
      httpService.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return httpService;
};

export default useHttpService;
