import { createRoot } from "react-dom/client";
import { AgentProvider } from "@/contexts/AgentContext";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AgentProvider>
    <App />
  </AgentProvider>
);
  