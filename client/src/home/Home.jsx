import React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import homeImage from "../assets/homeImage1.jpg";
import "./home.scss";
import { Button, Tabs, Tab, Typography, AppBar, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [value, setValue] = useState();

  //Send a request to check user.
  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
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

  //Navigate the user to the pages by user status.
  function shareStory() {
    verifyUser();
    isLoggedIn ? navigate("add") : navigate("login");
  }

  // Get the values from text fields.
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box id="main-box">
        <Box className="header-titles">
          <Typography className="first-typography">
            Stay close to people who feel like sunshine
          </Typography>
          <Typography className="first-typo-detail">
            You can browse the travel stories shared by many people here and
            plan your trip.
          </Typography>
          <Button className="diary-button" LinkComponent={Link} to="/diaries">
            View Diaries
          </Button>
        </Box>
      </Box>
      <Box className="between-box">
        <Typography id="between-boxes-typo">
          {" "}
          Sharing is caring. Sharing is good
        </Typography>
      </Box>
      <Box className="share-story-box">
        <Box className="share-story-headers">
          <Typography className="share-story-firs-typo-details">
            By sharing your travel memories, you can immortalize them and also
            help those who plan their travels.{" "}
          </Typography>
          <Box className="header-titles">
            <Button className="diary-button" onClick={shareStory}>
              Share Story
            </Button>
          </Box>
        </Box>
      </Box>

      <BottomNavigation
        id="bottom-navigation"
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default Home;
