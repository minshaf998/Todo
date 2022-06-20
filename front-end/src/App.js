import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./Register/Register";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import UserInfo from "./UserInfo/UserInfo";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/userinfo" exact element={<UserInfo />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
