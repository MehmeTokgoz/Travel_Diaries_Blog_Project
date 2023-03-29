const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");

//Get user information
const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(500).json({ message: "Internal Service Error" });
  }

  return res.status(200).json({ users });
};

// Get a specific user by id
const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    return res
      .status(200)
      .json({ user: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  //Checking the required fields before creating the user:
  if (!name && !email && !password && password.length < 6) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  // Hashing password:
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    //Saving user into the database with a hashed password:
    await newUser.save();
    return res.status(201).json("New User Created.");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Checking the required fields before logging in
  if (!email && !password && password.length < 6) {
    return res.send({ message: "Error code 422: Invalid Input" });
  }

  //Get the user whose email is provided. And from that user get back name, email, password
  try {
    const existingUser = await User.findOne({ email: req.body.email }).select(
      "name email password"
    );
    //Check the user exists or not:
    if (!existingUser) {
      return res.send({ message: "Error code 404: User was not found" });
    }
    //Check the password if the user exists:
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.send({ message: "Error code 400: Wrong password" });
    }
    const payload = {
      id: existingUser._id,
      name: existingUser.name,
    };
    // Create a token if the password is correct.
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.send({ _id: existingUser._id, token });
  } catch (error) {
    console.log(error);
  }
};
// Check the user
const verifyUser = async (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, payload) => {
    if (payload) {
      var user = await User.findOne({ _id: payload.id });
      res.send({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.send({ message: "Session expired" });
    }
  });
};

module.exports = { getAllUsers, signUp, login, verifyUser, getUserById };
