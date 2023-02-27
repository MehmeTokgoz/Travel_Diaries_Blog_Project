import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import DiaryCard from "../diaries/DiaryCard";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

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

  const getUserInfo = () => {
    axios.get(`http://localhost:4000/user/${userId}`).then(({ data }) => {
      setUser(data.user);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const getAllPosts = async () => {
    await axios.get("http://localhost:4000/posts/").then(({ data }) => {
      if (data) {
        const posts = data.posts;
        setPosts(posts);
      }
    });
  };

  const getUserPosts = () => {
    const currentUserPosts = posts.filter((post) => post.user._id === userId);
    setUserPosts(currentUserPosts);
  };

  console.log(userPosts);

  useEffect(() => {
    getAllPosts();
    verifyUser();
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [posts]);

  // function handleClick() {
  //   localStorage.clear();
  //   navigate("/");
  //   window.location.reload(true)
  // }

  function addNewPost() {
    navigate("/add");
  }

  return (
    <>
      <Box display="flex" flexDirection={"column"}>
        {user && (
          <>
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
            {/* <Button
              onClick={handleClick}
              sx={{ mr: "auto", width: "15%" }}
              color="warning"
              variant="contained"
            >
              Logout
            </Button>{" "} */}
            <br />
            <Button
              onClick={addNewPost}
              sx={{ mr: "auto", width: "15%" }}
              color="warning"
              variant="contained"
            >
              Add New Post
            </Button>{" "}
          </>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        {userPosts.length ? (
          userPosts.map((post, index) => {
            return (
              <DiaryCard
                key={index}
                title={post.title}
                date={post.date}
                description={post.description}
                id={post._id}
                image={post.image}
                location={post.location}
                user={post.user}
                name={post.user.name}
              />
            );
          })
        ) : (
          <p>Nothing to Display</p>
        )}
      </Box>
    </>
  );
}

export default Profile;
