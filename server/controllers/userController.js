const { hashSync, compareSync } = require("bcryptjs");
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

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6 &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({ email, name, password: hashedPassword });
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(201).json({ user });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6 &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User was not found" });
  }
  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  if (isPasswordCorrect) {
    return res
      .status(200)
      .json({ id: existingUser._id, message: "Login Successful" });
  }
};

module.exports = { getAllUsers, signUp, login };
