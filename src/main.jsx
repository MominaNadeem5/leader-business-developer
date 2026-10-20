import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Theme
import "./theme/colors.css";
import "./theme/animations.css";

// Base styles
import "./styles/base.css";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/utils.css";

// Layout styles
import "./styles/layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);