import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import SessionUpdater from "./SessionUpdater.tsx";
import WalletUpdater from "./WalletUpdater.tsx";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <SessionUpdater />
    <Toaster />
    <WalletUpdater />
  </React.StrictMode>
);
