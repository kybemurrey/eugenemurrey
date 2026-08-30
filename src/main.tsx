import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { installErrorReporting } from "@/lib/errorReporting";
import "./index.css";

installErrorReporting();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="architecture-theme">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
