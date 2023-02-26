import axios from "axios";
import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

function DiaryUpdate() {
  // const [userId, setUserId] = useState();
  const [post, setPost] = useState();
  // const [postId, setPostId] = useState();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    location: "",
    image: "",
  });

  const id = useParams().id;
  const navigate = useNavigate();

  const getPostDetails = async (id) => {
    const res = await axios
      .get(`http://localhost:4000/posts/${id}`)
      .catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unable to fetch diary");
    }

    const resData = await res.data;
    console.log(resData);
    return resData;
  };

  useEffect(() => {
    getPostDetails(id)
      .then((data) => {
        setPost(data.post);
        setInputs({
          title: data.post.title,
          description: data.post.description,
          image: data.post.image,
          location: data.post.location,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const postUpdate = async (data) => {
    const res = await axios
      .put(`http://localhost:4000/posts/${id}`, {
        title: data.title,
        description: data.description,
        location: data.location,
        image: data.image,
        date: new Date(),
      })
      .then( async () => {
        if (res.status !== 200) {
          alert("Post not updated");
          return console.log("Unable to udpate");
        }

        const resData = await res.data;
        return resData;
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs)
      .then((data) => {
        console.log(data);
        alert("Post Updated");
        navigate("/profile")
      })
      .catch((err) => {
        console.log(err);
        alert("not updated");
      });
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
      {post && (
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
            <FormLabel sx={{ fontFamily: "quicksand" }}>Image </FormLabel>
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
              Update
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default DiaryUpdate;
