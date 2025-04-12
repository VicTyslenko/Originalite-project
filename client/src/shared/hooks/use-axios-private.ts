import { useEffect } from "react";
import instance from "services/api/axios";

import { useStoreSelector } from "./global/use-store-selector";
import { useRefreshToken } from "./use-refresh";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const authData = useStoreSelector(state => state.auth.data);

  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authData?.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = instance.interceptors.response.use(
      response => response,

      async error => {
        const prevRequest = error?.config;
        if (error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [authData, refresh]);

  return instance;
};
