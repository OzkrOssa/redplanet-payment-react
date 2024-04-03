"use client"
import { ApiResponse } from "@/types/ApiResponse";
import React from "react";

interface ApiResponseProviderProps {
  children: React.ReactNode;
}

const ApiResponseContext = React.createContext<{
  apiResponse: ApiResponse | null;
  setApiResponse: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
}>({
  apiResponse: null,
  setApiResponse: () => {},
});

export const ApiResponseProvider: React.FC<ApiResponseProviderProps> = ({
  children,
}) => {
  const [apiResponse, setApiResponse] = React.useState<ApiResponse | null>(
    null
  );

  return (
    <ApiResponseContext.Provider
      value={{
        apiResponse,
        setApiResponse,
      }}
    >
      {children}
    </ApiResponseContext.Provider>
  );
};

export const useApiResponseContext = () => React.useContext(ApiResponseContext);
