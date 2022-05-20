import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./UserInfo.css";

function UserInfo(props) {
  const navigate = useNavigate();

  async function goBack() {
    await fetch("http://localhost:8000/api/userinfo", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data[0].name);
        alert(data[0].name);
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

  return <div>UserInfo</div>;
}

export default UserInfo;
