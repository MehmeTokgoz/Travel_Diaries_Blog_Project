import React, { useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Box,
  CardActions,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "./diaryCard.scss";
import PlaceIcon from "@mui/icons-material/Place";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";

const DiaryCard = (props) => {
  const [alertPosition, setAlertPosition] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alertPosition;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  //Send a request to check user.
  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUserId(data._id);
          setUser(data.name);
        });
      console.log(userId);
      console.log(user);
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
  }, [verifyUser, props]);

  //Delete the post and alert a notification.
  const handleDelete = async (id, newState) => {
    setAlertPosition({ open: true, ...newState });
    await axios
      .delete(`http://localhost:4000/posts/${id}`)
      .catch((error) => console.log(error));
    window.location.reload(true);
    console.log(id);
  };

  return (
    <Card id="main-card-box">
      <CardHeader
        className="diaryCardHeader"
        avatar={
          <>
            <Avatar className="avatar" aria-label="recipe">
              {props.name}
            </Avatar>
          </>
        }
        action={
          <IconButton aria-label="settings">
            <PlaceIcon />
          </IconButton>
        }
        subheader={props.date}
        location={props.location}
        title={props.location}
        date={props.date}
        id={props.id}
        description={props.description}
        user={props.user}
      />
      <img height="200" src={props.image} alt={props.title} />
      <CardContent id="main-card-info-content">
        <Typography className="card-info-header">
          {props.title} <br />
        </Typography>
        <hr className="line" />
        <Box className="post-description-box">
          <Typography className="post-description">
            {props.description}
          </Typography>
        </Box>
        <hr className="line" />
        {isLoggedIn && (
          <CardActions className="cardActions-buttons">
            <IconButton
              className="edit-icon"
              LinkComponent={Link}
              to={`/post/${props.id}`}
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleDelete(props.id, { vertical: "top", horizontal: "right" })
              }
            >
              <DeleteForeverIcon />
            </IconButton>
          </CardActions>
        )}
      </CardContent>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setAlertPosition({ ...alertPosition, open: false })}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          id="alert"
          onClose={() => setAlertPosition({ ...alertPosition, open: false })}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>SUCCESS</AlertTitle>
          Post Deleted Successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DiaryCard;
