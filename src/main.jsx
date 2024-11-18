import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeProvider from "./contexts/ThemeContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import AlertProvider from "./contexts/AlertContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  </StrictMode>
);
