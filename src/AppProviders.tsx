import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext, authStore } from "./context/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContext.Provider value={authStore}>
          {children}
        </AuthContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppProviders;
