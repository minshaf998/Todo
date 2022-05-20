import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./Dashboard.css";

function Dashboard(props) {
  const navigate = useNavigate();

  async function goBack() {
    await fetch("http://localhost:8000/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  }

  useEffect(() => {
    // console.log("from useEffect");
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const user = jwt_decode(token);
      // console.log(user);
      if (!user) {
        localStorage.removeItem(token);
        navigate("/login");
      } else {
        goBack();
      }
    } else {
      navigate("/login");
    }
  }, []);

  function handleProfile() {
    navigate("/userinfo");
  }

  function handleLogout() {
    console.log("logout");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>

      <form>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>

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
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-0" type="checkbox" defaultChecked={true} />
            <label className="todo-label" htmlFor="todo-0">
              Eat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Eat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Eat</span>
            </button>
          </div>
        </li>
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-1" type="checkbox" />
            <label className="todo-label" htmlFor="todo-1">
              Sleep
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Sleep</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Sleep</span>
            </button>
          </div>
        </li>
        <li className="todo stack-small">
          <div className="c-cb">
            <input id="todo-2" type="checkbox" />
            <label className="todo-label" htmlFor="todo-2">
              Repeat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn">
              Edit <span className="visually-hidden">Repeat</span>
            </button>
            <button type="button" className="btn btn__danger">
              Delete <span className="visually-hidden">Repeat</span>
            </button>
          </div>
        </li>
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
