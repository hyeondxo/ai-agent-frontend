import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserModeProvider } from "./contexts/UserModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserModeProvider>
    <App />
  </UserModeProvider>
);
  