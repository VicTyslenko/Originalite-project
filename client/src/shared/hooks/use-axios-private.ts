import { useEffect } from "react";
import instance from "services/api/axios";

import { refreshToken } from "shared/utils";

import { useStoreSelector } from "./global/use-store-selector";

export const useAxiosPrivate = () => {
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
          const newAccessToken = await refreshToken();

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
  }, [authData]);

  return instance;
};
