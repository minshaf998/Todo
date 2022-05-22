import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./UserInfo.css";

function UserInfo(props) {
  const navigate = useNavigate();

  async function getData(email) {
    // console.log(email);
    await fetch("http://localhost:8000/api/auth/userinfo/email", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((data) => {
        // console.log(data);
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

  return <div>UserInfo</div>;
}

export default UserInfo;
