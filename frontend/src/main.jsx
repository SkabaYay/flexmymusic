import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import Profile from "./pages/profile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Profile />
  </StrictMode>,
);
