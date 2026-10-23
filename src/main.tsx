import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./pwaUpdate";
import "./versionCheck";

createRoot(document.getElementById("root")!).render(<App />);
