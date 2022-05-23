import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Input() {
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [isCompleted] = useState(false);

  function getEmail() {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        return user.email;
      }
    } else {
      navigate("/login");
    }
  }
  const handleClick = async (values, event) => {
    const email = getEmail();
    await fetch("http://localhost:8000/api/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        note: note,
        userid: email,
        isCompleted: isCompleted,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
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
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn__primary btn__lg"
          onClick={handleClick}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Input;
