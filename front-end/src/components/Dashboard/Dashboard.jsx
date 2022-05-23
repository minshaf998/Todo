import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./Dashboard.css";
import Task from "./Task";
import Input from "./Input";

function Dashboard(props) {
  const navigate = useNavigate();

  async function getData() {
    try {
      const data = await fetch("http://localhost:8000/api/todo", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []);

  function handleProfile() {
    navigate("/userinfo");
  }

  function handleLogout() {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>

      <Input />

      <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>

      <h2 id="list-heading">3 tasks remaining</h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <Task />
      </ul>
      <hr className="hr" />
      <button
        type="button"
        className="btn btn__primary btn__lg btn_profile"
        onClick={handleProfile}
      >
        View Profile
      </button>

      <hr className="hr" />
      <button
        type="button"
        className="btn btn__primary btn__lg btn_profile"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
export default Dashboard;
