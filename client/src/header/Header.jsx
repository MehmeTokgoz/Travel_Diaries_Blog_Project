import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mt.jpg";

const linksArr = ["home", "diaries", "profile", "add", "logout"];
const loggedOutlinksArr = ["home", "diaries", "login"];

function Header() {
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState(false);
  const navigate = useNavigate();

  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
     await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token")
        }).then(({data})=>{setUserId(data._id)})
  }};

  useEffect(()=> {
    verifyUser().then(()=>{
      if(userId) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [verifyUser])
  console.log(isLoggedIn)

  return (
    <div>
      {" "}
      <AppBar className="appbar">
        <Toolbar className="toolbar">
          <img src={logo} alt="#" />
          <Tabs
            className="tabs"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            {isLoggedIn
              ? (linksArr.map((link) => (
                  <Tab
                    className="tab"
                    key={link}
                    label={link}
                    LinkComponent={Link}
                    to={`/${link === "home" ? "" : link}`}
                  />
                )))
              : (loggedOutlinksArr.map((link) => (
                  <Tab
                    className="tab"
                    key={link}
                    label={link}
                    LinkComponent={Link}
                    to={`/${link === "home" ? "" : link}`}
                  />
                )))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
