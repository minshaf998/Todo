import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./Dashboard.css";
import Task from "./Task";
import Input from "./Input";

function Dashboard(props) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  async function getData(email) {
    await fetch(`http://localhost:8000/api/todo/complete/${email}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        getData(user.email);
      }
    } else {
      navigate("/login");
    }
  }, []);

  function handleProfile() {
    navigate("/userinfo");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>

      <Input />

      {/* <div className="filters btn-group stack-exception">
        <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span>all</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
        </button>
      </div> */}

      <h2 id="list-heading">{items.length} tasks remaining</h2>

      <span
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <Task />
      </span>
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
