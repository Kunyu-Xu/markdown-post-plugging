import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

// 确保 DOM 加载完成
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </React.StrictMode>,
    );
  }
});
