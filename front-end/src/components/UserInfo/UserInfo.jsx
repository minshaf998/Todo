import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Card } from "antd";

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

  return (
    <div>
      <div className="site-card-border-less-wrapper info_div">
        <Card
          // title="Card title"
          bordered={false}
          style={{
            width: 500,
          }}
        >
          <h2>Name : {name}</h2>
          <h2>Email : {email}</h2>
        </Card>
      </div>
    </div>
  );
}

export default UserInfo;
