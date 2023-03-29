import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Slide,
  useScrollTrigger,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/mt.jpg";

const linksArr = ["home", "diaries", "add", "profile", "logout"];
const loggedOutlinksArr = ["home", "diaries", "login"];

function Header(props) {
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [value, setValue] = useState(false);
  const navigate = useNavigate();
  const trigger = useScrollTrigger();
  const [alertPosition, setAlertPosition] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alertPosition;

  //Hide the navigation bar when scrolling.
  function HideOnScroll(props) {
    const { children } = props;

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

//Send a request to check user.
  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUserId(data._id);
        });
    }
  };

 //Call the verifyUser function on the page render and set the user status.
  useEffect(() => {
    verifyUser().then(() => {
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [verifyUser]);
  console.log(isLoggedIn);

  // Clear local storage items when user logged out
  const handleLogout = (e, val, newState) => {
    setValue(val);
    if (val === 4) {
      setAlertPosition({ open: true, ...newState });
      localStorage.clear();
      navigate("/");
      setUserId("");
    }
    console.log(isLoggedIn);
  };

  return (
    <div>
      {" "}
      <HideOnScroll {...props}>
        <AppBar className="appbar">
          <Toolbar className="toolbar">
            <img src={logo} alt="#" />
            <Tabs className="tabs" value={value} onChange={handleLogout}>
              {isLoggedIn
                ? linksArr.map((link) => (
                    <Tab
                      id="tab"
                      key={link}
                      label={link}
                      LinkComponent={Link}
                      to={`/${
                        link === "home" ? "" : link === "logout" ? "" : link
                      }`}
                    />
                  ))
                : loggedOutlinksArr.map((link) => (
                    <Tab
                      id="tab"
                      key={link}
                      label={link}
                      LinkComponent={Link}
                      to={`/${link === "home" ? "" : link}`}
                    />
                  ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setAlertPosition({ ...alertPosition, open: false })}
        // onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          id="alert"
          onClose={() => setAlertPosition({ ...alertPosition, open: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>SUCCESS</AlertTitle>
          Logout successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Header;
