import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      <Dashboard />
    </div>
  );
}

export default App;
