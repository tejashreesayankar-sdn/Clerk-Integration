// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

// ✅ Replace with your actual Clerk publishable key (starts with pk_)
const clerkPubKey = "pk_test_aW4tZXNjYXJnb3QtNTQuY2xlcmsuYWNjb3VudHMuZGV2JA"; // from Clerk → API Keys

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
