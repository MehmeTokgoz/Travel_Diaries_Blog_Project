import axios from "axios";
import { Box } from "@mui/material";
import DiaryCard from "./DiaryCard";
import React, { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import "./diaries.scss";
import "../searchBar/SearchBar.scss";

function Diaries() {
  const [posts, setPosts] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchState, setSearchState] = useState(false);

  // Request to get all posts from database.
  const getAllPosts = async () => {
    await axios.get("http://localhost:4000/posts/").then(({ data }) => {
      if (data) {
        const posts = data.posts;
        setPosts(posts);
      }
    });
  };
// Call the getAllPosts function on the page render. 
  useEffect(() => {
    getAllPosts();
  }, []);

//Filter posts by search
  const handleSearch = (query) => {
    setSearchState(true);
    setSearchResults(posts.filter((post) => post.location.toLowerCase().includes(query.toLowerCase())));
  };

  return (
    <Box className="diaries-main-box">
      <Box className="searchBar-form-box">
        <SearchBar onSearch={handleSearch} />
      </Box>
      <Box className="diary-container">
        {searchState
          ? searchResults.map((item, index) => (
              <DiaryCard
                date={new Date(`${item.date}`).toLocaleDateString()}
                description={item.description}
                image={item.image}
                id={item.user._id}
                location={item.location}
                title={item.title}
                user={item.name}
                key={index}
                name={item.user.name.charAt(0)}
              />
            ))
          : posts &&
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
                name={item.user.name.charAt(0)}
              />
            ))}
      </Box>
    </Box>
  );
}

export default Diaries;
