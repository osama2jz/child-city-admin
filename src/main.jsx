import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { Notifications } from "@mantine/notifications";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 30000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colors: {
            primary: [
              "#ff8087",
              "#ff8087e6",
              "#ff8087cc",
              "#ff8087b3",
              "#ff808799",
              "#ff808780",
              "#ff808766",
              "#ff80874d",
              "#ff808733",
            ],
          },
          primaryColor: "primary",
          globalStyles: (theme) => ({
            ".mantine-Modal-title": {
              margin: "auto",
              fontWeight: "bold",
              color: "rgb(0,0,0,0.5)",
            },
          }),
        }}
      >
        <Toaster />
 
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <Notifications
              position="top-center"
              zIndex={2077}
              style={{ marginTop: "60px" }}
            />
            <App />
          </QueryClientProvider>
        </UserProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
