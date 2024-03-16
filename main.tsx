/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
