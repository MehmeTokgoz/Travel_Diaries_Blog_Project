import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import DiaryCard from "../diaries/DiaryCard";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    await axios
      .post("http://localhost:4000/user/verify", {
        token: localStorage.getItem("token"),
      })
      .then(({ data }) => setUserId(data._id));
  };

  useEffect(() => {
    getUserDetails().then(
      axios.get(`http://localhost:4000/user/${userId}`).then(({ data }) => {
        setUser(data.user);
      })
    );
  }, [userId]);

  function handleClick() {
    localStorage.clear();
    navigate("/");
  }

  function addNewPost() {
    navigate("/add")
  }

  return (
    <Box display="flex" flexDirection={"column"}>
      {user && (
        <>
          {" "}
          <Typography
            textAlign={"center"}
            variant="h3"
            fontFamily={"quicksand"}
            padding={2}
          >
            User Profile
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            Name: {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            Email: {user.email}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: "auto", width: "15%" }}
            color="warning"
            variant="contained"
          >
            Logout
          </Button>{" "} <br />

          <Button
            onClick={addNewPost}
            sx={{ mr: "auto", width: "15%" }}
            color="warning"
            variant="contained"
          >
            Add New Post
          </Button>{" "}
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
          >
           {user.posts.map((post, index) => (
              <DiaryCard
                key={index}
                title={post.title}
                date={post.date}
                description={post.description}
                id={post._id}
                image={post.image}
                location={post.location}
                user={post.user}
                name={user.name}
              />
            ))}
          </Box>{" "}
        </>
      )}
    </Box>
  );
}

export default Profile;
