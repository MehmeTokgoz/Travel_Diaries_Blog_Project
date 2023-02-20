const { hashSync, compareSync } = require("bcryptjs");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modules/User");

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

const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name &&
    // name.trim() === "" &&
    !email &&
    // email.trim() === "" &&
    !password &&
    password.length < 6
    // password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json("New User Created.");
  } catch (error) {
    console.log(error);
  }
};

// const signUp = async (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (
//     !name &&
//     name.trim() === "" &&
//     !email &&
//     email.trim() === "" &&
//     !password &&
//     password.length < 6 &&
//     password.trim() === ""
//   ) {
//     return res.status(422).json({ message: "Invalid Input" });
//   }
//   const hashedPassword = hashSync(password);

//   let user;
//   try {
//     user = new User({ email, name, password: hashedPassword });
//     await user.save();
//   } catch (error) {
//     return console.log(error);
//   }

//   if (!user) {
//     return res.status(500).json({ message: "Unexpected error occured" });
//   }

//   return res.status(201).json({ user });
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (
    !email &&
    // email.trim() === "" &&
    !password &&
    password.length < 6
    // password.trim() === ""
  ) {
    return res.send({ message: "Error code 422: Invalid Input" });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email }).select(
      "name email password"
    );

    if (!existingUser) {
      return res.send({ message: "Error code 404: User was not found" });
    }

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
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.send({ existingUser, token });
  } catch (error) {
    console.log(error);
  }
};
const verifyUser = async (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, async (err, payload) => {
    if (payload) {
      var user = await User.findOne({ _id: payload.id });
      res.send(user);
    } else {
      res.send({ message: "Session expired" });
    }
  });
};

// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (
//     !email &&
//     email.trim() === "" &&
//     !password &&
//     password.length < 6 &&
//     password.trim() === ""
//   ) {
//     return res.status(422).json({ message: "Invalid Input" });
//   }

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email });
//   } catch (error) {
//     console.log(error);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "User was not found" });
//   }
//   const isPasswordCorrect = compareSync(password, existingUser.password);

//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Incorrect password" });
//   }
//   if (isPasswordCorrect) {
//     return res
//       .status(200)
//       .json({ id: existingUser._id, message: "Login Successful" });
//   }
// };

module.exports = { getAllUsers, signUp, login, verifyUser, getUserById };
