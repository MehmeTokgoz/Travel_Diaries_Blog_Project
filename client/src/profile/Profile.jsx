import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import DiaryCard from "../diaries/DiaryCard";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../profile/profile.scss";
import AddPost from "../add/AddPost";

function Profile() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  //Sen a request to get the user info.
  const getUserInfo = async () => {
    await axios.get(`http://localhost:4000/user/${userId}`).then(({ data }) => {
      console.log(data);
      setUser(data);
    });
  };

  // Call the getUserInfo function on page render.
  useEffect(() => {
    getUserInfo();
  }, [userId]);

  // Request to get all posts from database.
  const getAllPosts = async () => {
    await axios.get("http://localhost:4000/posts/").then(({ data }) => {
      if (data) {
        const posts = data.posts;
        setPosts(posts);
      }
    });
  };

  // Filter the current user posts.
  const getUserPosts = () => {
    const currentUserPosts = posts.filter((post) => post.user._id === userId);
    setUserPosts(currentUserPosts);
  };

  //Call the getAllPosts function on page render.
  useEffect(() => {
    getAllPosts();
  }, []);

  //Call the getUserPosts function on page render.
  useEffect(() => {
    getUserPosts();
  }, [posts]);

//Navigate the user to add post page.
  function addNewPost() {
    navigate("/add");
  }

  return (
    <>
      <Box className="profile-info-container">
        {user && (
          <>
            <Box className="profile-info-box">
              <table>
                <tr>
                  <th colSpan={2}>
                    <Typography
                      id="user-profile"
                      textAlign={"center"}
                      variant="h3"
                      fontFamily={"quicksand"}
                      padding={2}
                    >
                      USER PROFILE
                    </Typography>
                  </th>
                </tr>

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {" "}
                    <Button
                      id="addNew-button"
                      onClick={addNewPost}
                      sx={{ mr: "auto", width: "15%" }}
                      variant="contained"
                    >
                      Add New Post
                    </Button>{" "}
                  </td>
                </tr>
              </table>
            </Box>
          </>
        )}
      </Box>
      <Box
        id="diary-container"
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
                date={new Date(`${post.date}`).toLocaleDateString()}
                description={post.description}
                id={post._id}
                image={post.image}
                location={post.location}
                user={posts.user}
                name={post.user.name.charAt(0)}
              />
            );
          })
        ) : (
          <p className="no-post-text">You have no posts</p>
        )}
      </Box>
    </>
  );
}

export default Profile;
