import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>,
);
