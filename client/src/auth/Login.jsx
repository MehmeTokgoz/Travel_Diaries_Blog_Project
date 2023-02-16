import axios from "axios";
import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./login-signup.scss";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const authRequest = async (signup, data) => {
    const res = await axios
      .post(`http://localhost:4000/user/${signup ? "signup" : "login"}`, {
        name: data.name ? data.name : "",
        email: data.email,
        password: data.password,
      })
      .catch((error) => console.log(error));

    if (res.status !== 200 || res.status !== 201) {
      return console.log("Authentication Failed");
    }
    const resData = await res.data;
    return resData;
  };

  if (isSignup) {
    authRequest(true, inputs)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  } else {
    authRequest(false, inputs)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box className="form-box">
          <Typography>{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                value={inputs.name}
                name="name"
                onChange={handleChange}
              />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField
            value={inputs.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <FormLabel>Password</FormLabel>
          <TextField
            value={inputs.password}
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button className="submit-button" type="submit">
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={() => setIsSignup(!isSignup)}>
            Go to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
