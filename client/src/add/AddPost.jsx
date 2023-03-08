import axios from "axios";
import { Alert, AlertTitle, Box, Button, FormLabel, Snackbar, TextField, Typography } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../add/addPost.scss";

function AddPost() {
  const [userId, setUserId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [alertPosition, setAlertPosition] = useState({
    open:false,
    vertical: "top",
    horizontal:"center"
  })
  const { vertical, horizontal, open } = alertPosition;

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

  useEffect(() => {
    verifyUser().then(() => {
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [verifyUser]);

  const addPost = async (data) => {
    const res = await axios
      .post("http://localhost:4000/posts/", {
        title: data.title,
        description: data.description,
        location: data.location,
        image: data.image,
        date: data.date,
        user: userId,
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

  const handleSubmit = (e, newState) => {
    e.preventDefault();
    console.log(inputs);
    addPost(inputs)
      .then(() => {
        navigate("/diaries");
        console.log(onResReceived);
      })
      .catch((err) => console.log(err));
      setAlertPosition({open: true, ...newState});
  };

  return (
    <Box className="main-box">
      <Box className="title-icon-box">
        <Typography className="add-travel-text">
          Add Your Travel Diary
        </Typography>
        <TravelExploreIcon className="travel-icon" />
      </Box>
      <form onSubmit={handleSubmit}>
        <Box className="inputs-name-box">
          <Box className="title-date-box">
            <Box className= "title-box">
              <FormLabel id="form-labels1">Title</FormLabel>
              <TextField
                className="input-text-fields"
                onChange={handleChange}
                name="title"
                value={inputs.title}
                variant="outlined"
              />
            </Box>
            <Box className= "date-box">
            <FormLabel id="form-labels2">Date</FormLabel>
              <TextField
                className="input-text-fields"
                type="date"
                onChange={handleChange}
                name="date"
                value={inputs.date}
                variant="outlined"
              />
            </Box>
          </Box>

          <FormLabel id="form-labels3">Description</FormLabel>
          <TextField
            className="input-text-fields"
            onChange={handleChange}
            name="description"
            value={inputs.description}
            variant="outlined"
          />
          <FormLabel id="form-labels4">Image URL</FormLabel>
          <TextField
            className="input-text-fields"
            onChange={handleChange}
            name="image"
            value={inputs.image}
            variant="outlined"
          />

          <FormLabel id="form-labels5">Location</FormLabel>
          <TextField
            className="input-text-fields"
            onChange={handleChange}
            name="location"
            value={inputs.location}
            variant="outlined"
          />

          <Button className="post-button" type="submit" variant="contained">
            Post
          </Button>
        </Box>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
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
          Post Added Successfully
        </Alert>
      </Snackbar>
    </Box>
  );

  // return (
  //   <Box className="main-box">
  //     <Box className="title-icon-box">
  //       <Typography className="add-travel-text">
  //         Add Your Travel Diary
  //       </Typography>
  //       <TravelExploreIcon className="travel-icon" />
  //     </Box>
  //     <form onSubmit={handleSubmit}>
  //       <Box className="inputs-name-box">
  //         <FormLabel className="form-labels">Title</FormLabel>
  //         <TextField
  //           className="input-text-fields"
  //           onChange={handleChange}
  //           name="title"
  //           value={inputs.title}
  //           variant="outlined"
  //         />
  //         <FormLabel className="form-labels">Description</FormLabel>
  //         <TextField
  //           className="input-text-fields"
  //           onChange={handleChange}
  //           name="description"
  //           value={inputs.description}
  //           variant="outlined"
  //         />
  //         <FormLabel className="form-labels">Image URL</FormLabel>
  //         <TextField
  //           className="input-text-fields"
  //           onChange={handleChange}
  //           name="image"
  //           value={inputs.image}
  //           variant="outlined"
  //         />

  //         <FormLabel className="form-labels">Location</FormLabel>
  //         <TextField
  //           className="input-text-fields"
  //           onChange={handleChange}
  //           name="location"
  //           value={inputs.location}
  //           variant="outlined"
  //         />
  //         <FormLabel className="form-labels">Date</FormLabel>
  //         <TextField
  //           className="input-text-fields"
  //           type="date"
  //           onChange={handleChange}
  //           name="date"
  //           value={inputs.date}
  //           variant="outlined"
  //         />
  //         <Button className="post-button" type="submit" variant="contained">
  //           Post
  //         </Button>
  //       </Box>
  //     </form>
  //   </Box>
  // );
}

export default AddPost;
