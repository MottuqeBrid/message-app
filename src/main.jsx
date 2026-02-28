import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./route/route.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
// import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      {/* <AuthProvider> */}
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  </StrictMode>,
);
