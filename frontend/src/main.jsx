// import React, { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import AuthContext from "./context/authContext.jsx";

// createRoot(document.getElementById("root")).render(

//     <AuthContext>
//       <App />
//     </AuthContext>

// );
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext"; // capitalized
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
