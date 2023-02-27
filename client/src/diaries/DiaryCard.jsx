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
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./diaryCard.scss";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";

const DiaryCard = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  console.log(props.id);

  

  const verifyUser = async () => {
    if (localStorage.getItem("token")) {
      await axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUserId(data._id);
        });
        console.log(userId);
    }
  };

  useEffect(() => {
    verifyUser().then(() => {
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [verifyUser]);


  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4000/posts/${id}`)
      .catch((error) => console.log(error));
    setOpen(true);
    window.location.reload(true);
  };

  return (
    <Card className="main-card-box">
      <CardHeader
        className="diaryCardHeader"
        avatar={<Avatar className="avatar" aria-label="recipe">MT</Avatar>}
        action={
          <IconButton aria-label="settings">
            <PlaceIcon />
          </IconButton>
        }
        title={props.location}
        location={props.location}
        date={props.date}
        id={props.id}
        description={props.description}
        user={props.user}
      />
      <img height="194" src={props.image} alt={props.title} />
      <CardContent>
        <Typography className="card-info-header">
          {props.title} <br />
        </Typography>
        <hr />
        <Box>
          <Typography>{props.description}</Typography>
        </Box>
      </CardContent>

      {isLoggedIn && (
        <CardActions className="cardActions-buttons">
          <Button LinkComponent={Link} to={`/post/${props.id}`}>
            EDIT
          </Button>
          <Button onClick={() => handleDelete(props.id)}>DELETE</Button>
        </CardActions>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Post Deleted Successfully
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default DiaryCard;
