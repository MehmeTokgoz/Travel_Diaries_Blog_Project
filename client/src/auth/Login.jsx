import axios from "axios";
import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-signup.scss";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  //Get the values from text fields.
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Log in or sign up with those values
  const authRequest = async (signup, data) => {
    const res = await axios
      .post(`http://localhost:4000/user/${signup ? "signup" : "login"}/`, {
        name: data.name ? data.name : "",
        email: data.email,
        password: data.password,
      })

      // If the values are correct navigate to the user profile page.
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data._id);
          console.log(data);
          console.log(1);
          navigate("/profile");
        }
      })
      .catch((error) => console.log(error));
  };

  // Send a request to sign up or login when submitting the form.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      authRequest(true, inputs);

      setIsSignup(false);
    } else {
      authRequest(false, inputs);
    }
  };

  return (
    <Box id="main-login-box">
      <form className="login-form" onSubmit={handleSubmit}>
        <Box className="form-box">
          <Typography className="signup-login">
            {isSignup ? "SIGNUP" : "LOGIN"}
          </Typography>
          {isSignup && (
            <>
              <FormLabel className="form-labels">Name</FormLabel>
              <TextField
                id="input-text-field1"
                value={inputs.name}
                name="name"
                onChange={handleChange}
              />
            </>
          )}
          <FormLabel className="form-labels">Email</FormLabel>
          <TextField
            id="input-text-field2"
            value={inputs.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <FormLabel className="form-labels">Password</FormLabel>
          <TextField
            id="input-text-field3"
            value={inputs.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button className="submit-button" type="submit">
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            className="go-to-button"
            onClick={() => setIsSignup(!isSignup)}
          >
            Go to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
