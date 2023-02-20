import React from "react";
import { useState } from "react";
import { AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import "./header.scss";
import { Link } from "react-router-dom";
import logo from "../assets/mt.jpg";

const linksArr = ["home", "diaries",  "profile", "add", "login"];
function Header() {
  const [value, setValue] = useState(false);
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
            {linksArr.map((link) => (
              <Tab
                className="tab"
                key={link}
                label={link}
                LinkComponent={Link}
                to={`/${link === "home" ? "" : link}` }
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
