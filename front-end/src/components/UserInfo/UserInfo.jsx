import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./UserInfo.css";

function UserInfo(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function getData(email) {
    try {
      await fetch(`http://localhost:8000/api/auth/userinfo/${email}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((result) => result.json())
        .then((user) => {
          // console.log(user.email, user.name);
          setName(user.name);
          setEmail(user.email);
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
        getData(user.email);
      }
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{(name, email)}</div>;
}

export default UserInfo;
