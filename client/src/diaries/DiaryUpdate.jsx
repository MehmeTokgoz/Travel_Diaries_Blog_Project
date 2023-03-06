import axios from "axios";
import { Alert, AlertTitle, Button, FormLabel, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import "../diaries/diaryUpdate.scss";

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
  const [alertPosition, setAlertPosition] = useState({
    open:false,
    vertical: "top",
    horizontal:"center"
  })
  const { vertical, horizontal, open } = alertPosition;

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
      .then(async () => {
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
  const handleSubmit = (e, newState) => {
    setAlertPosition({open: true, ...newState});
    e.preventDefault();
    console.log(inputs);
    postUpdate(inputs)
      .then((data) => {
        console.log(data);
        // alert("Post Updated");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        alert("not updated");
      });
  
  };
  return (
    <Box className="main-diaryUpdate-box">
      <Box className="text-icon-box">
        <Typography className="update-travel-text" variant="h4">
          Update Your Travel Diary
        </Typography>
        <TravelExploreIcon className="travel-icon" />
      </Box>
      {post && (
        <form onSubmit={handleSubmit}>
          <Box className="inputs-box">
            <FormLabel className="form-labels">Title</FormLabel>
            <TextField
              className="inputs-text-fields"
              onChange={handleChange}
              name="title"
              value={inputs.title}
              variant="outlined"
            />
            <FormLabel className="form-labels">Description</FormLabel>
            <TextField
              className="inputs-text-fields"
              onChange={handleChange}
              name="description"
              value={inputs.description}
              variant="outlined"
            />
            <FormLabel className="form-labels">Image </FormLabel>
            <TextField
              className="inputs-text-fields"
              onChange={handleChange}
              name="image"
              value={inputs.image}
              variant="outlined"
            />

            <FormLabel className="form-labels">Location</FormLabel>
            <TextField
              className="inputs-text-fields"
              onChange={handleChange}
              name="location"
              value={inputs.location}
              variant="outlined"
            />
            {/* <FormLabel sx={{ fontFamily: "quicksand" }}>Date</FormLabel>
          <TextField
            type="date"
            onChange={handleChange}
            name="date"
            value={inputs.date}
            variant="standard"
            margin="normal"
          /> */}

            <Button
              className="update-button"
              type="submit"
              color="warning"
              variant="contained"
            >
              Update
            </Button>
          </Box>
        </form>
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=> setAlertPosition({...alertPosition, open: false})}
        // onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert id="alert"
          onClose={() => setAlertPosition({...alertPosition, open: false})}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>SUCCESS</AlertTitle>
          Post Updated Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DiaryUpdate;
