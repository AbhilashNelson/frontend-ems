// Mount the React application
// This is the entry point for React.
// Import React core globally so we dont want to do it in every componet
import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import our own custom styles (just in case)
import './index.css'
// Import Router
import { BrowserRouter } from "react-router-dom";  
// Import main App component
import App from './App.jsx'
// Import Bootstrap CSS/JS globally
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Mount the App into the #root element from index.html
createRoot(document.getElementById('root')).render(
    // StrictMode helps catch errors during development
    //Wrap App with Router
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
