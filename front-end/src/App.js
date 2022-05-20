import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
    // <div className="appstyle">
    //   {/* <Register /> */}
    //   <Login />
    // </div>
  );
}

export default App;
