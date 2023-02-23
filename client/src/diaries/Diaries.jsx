import axios from "axios";
import { Box } from "@mui/material";
import DiaryCard from "./DiaryCard";
import React, { useEffect, useState } from "react";
// import {getAllPosts} from "../apis/allApis";
import "./diaries.scss";

function Diaries() {
  const [posts, setPosts] = useState();
  const [userId, setUserId] = useState();
  console.log(userId);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:4000/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => setUserId(data._id));
    }
  }, []);
  console.log("userId")

  useEffect(() => {
    axios.get("http://localhost:4000/posts/").then(({ data }) => {
      if (data) {
        const posts = data.posts;
        const userPosts = posts.filter((post) => post.user._id === userId);
        console.log(userPosts);

        setPosts(userPosts);
        console.log(userPosts.map((item)=>item._id));
        console.log(posts.map((item)=> item.user._id))
      }
    });
  }, [userId]);


  return (
    <Box className="diary-container">
      {posts &&
        posts.map((item, index) => (
          <DiaryCard
            date={new Date(`${item.date}`).toLocaleDateString()}
            description={item.description}
            image={item.image}
            id={item.user._id}
            location={item.location}
            title={item.title}
            user={item.name}
            key={index}
            
          />
        ))}
    </Box>
  );
}

export default Diaries;
