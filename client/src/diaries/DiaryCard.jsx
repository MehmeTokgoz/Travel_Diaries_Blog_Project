import React from "react";
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
} from "@mui/material";
import "./diaryCard.scss";
// import diary1 from "../assets/1-Diary One1129244638-612x612.jpg";
import PlaceIcon from "@mui/icons-material/Place";
const DiaryCard = (props) => {
  return (
    <Card className="main-card-box">
      <CardHeader
        className="diaryCardHeader"
        avatar={
          <Avatar className="avatar" aria-label="recipe">
            MT
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <PlaceIcon />
          </IconButton>
        }
        title={props.location}
        location={props.location}
        date={props.date}
        id = {props.id}
        description={props.description}
        user={props.user}
      />
      <img height="194" src={props.image} alt = {props.title}/>
      <CardContent>
        <Typography className="card-info-header">
          {props.title} <br />
        </Typography>
        <hr />
        <Box>
          <Typography>{props.description}</Typography>
        </Box>
      </CardContent>
      <CardActions className="cardActions-buttons">
        <Button>EDIT</Button>
        <Button>DELETE</Button>
      </CardActions>
    </Card>
  );
};

export default DiaryCard;
