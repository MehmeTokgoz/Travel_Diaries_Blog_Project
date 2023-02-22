import axios from "axios";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
  const addPost = async (data) => {
    const res = await axios
      .post("http://localhost:4000/posts/", {
        title: data.title,
        description: data.description,
        location: data.location,
        image: data.image,
        date: data.date,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    console.log(res);
    if (res.status !== 201) {
      return console.log("Error Occured");
    }

    const resData = await res.data;
    return resData;
  };

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
    date: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onResReceived = (data) => {
    console.log(data);
    navigate("/diaries");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    addPost(inputs)
      .then(() => {
        navigate("/diaries")
        alert("Post added")
        console.log(onResReceived);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" flexDirection={"column"} width="100%" height="100%">
      <Box display="flex" margin="auto" padding={2}>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          fontFamily={"dancing script"}
        >
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: "40px", paddingLeft: 1, color: "lightcoral  " }}
        />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          padding={3}
          display="flex"
          width="80%"
          margin="auto"
          flexDirection={"column"}
        >
          <FormLabel sx={{ fontFamily: "quicksand" }}>Title</FormLabel>
          <TextField
            onChange={handleChange}
            name="title"
            value={inputs.title}
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Description</FormLabel>
          <TextField
            onChange={handleChange}
            name="description"
            value={inputs.description}
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Image URL</FormLabel>
          <TextField
            onChange={handleChange}
            name="image"
            value={inputs.image}
            variant="standard"
            margin="normal"
          />

          <FormLabel sx={{ fontFamily: "quicksand" }}>Location</FormLabel>
          <TextField
            onChange={handleChange}
            name="location"
            value={inputs.location}
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={{ fontFamily: "quicksand" }}>Date</FormLabel>
          <TextField
            type="date"
            onChange={handleChange}
            name="date"
            value={inputs.date}
            variant="standard"
            margin="normal"
          />
          <Button
            type="submit"
            color="warning"
            sx={{ width: "50%", margin: "auto", mt: 2, borderRadius: 7 }}
            variant="contained"
          >
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddPost;
