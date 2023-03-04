import axios from "axios";
import { Box } from "@mui/material";
import DiaryCard from "./DiaryCard";
import React, { useEffect, useState } from "react";
import "./diaries.scss";

function Diaries() {
  const [posts, setPosts] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get("http://localhost:4000/posts/").then(({ data }) => {
      if (data) {
        const posts = data.posts;
        setPosts(posts);
        console.log(posts);
      }
    });
  }, []);

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
            name = {item.user.name.charAt(0)}
          />
        ))}
    </Box>
  );
}

export default Diaries;
