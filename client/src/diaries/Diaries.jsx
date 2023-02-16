import axios from "axios";
import { Box } from "@mui/material";
import DiaryCard from "./DiaryCard";
import React, { useEffect, useState } from "react";
// import {getAllPosts} from "../apis/allApis";
import "./diaries.scss";

function Diaries() {
  const [posts, setPosts] = useState();

  const getAllPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts/");

    if (res.status !== 200) {
      return console.log("Error occured");
    } 
      const data = res.data;
      return data;
  };

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box className="diary-container">
      {posts && posts.map((item, index) => <DiaryCard 
      date = {new Date(`${item.date}`).toLocaleDateString()}
      description = {item.description}
      image = {item.image}
      id = {item._id}
      location = {item.location}
      title= {item.title}
      key={index} />)}
    </Box>
  );
}

export default Diaries;
