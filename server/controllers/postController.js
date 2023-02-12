const { default: mongoose } = require("mongoose");
const Post = require("../modules/Post");
const User = require("../modules/User");

const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    return console.log(error);
  }

  if (!posts) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ posts });
};

const addPost = async (req, res) => {
  const { title, description, image, location, date, user } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !image &&
    image.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !user
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User was not found" });
  }

  let post;

  try {
    post = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.posts.push(post);
    await existingUser.save({ session });
    post = await post.save({ session });
    session.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(500).json({ message: "Unexpected error occured" });
  }
  return res.status(201).json({ post });
};

const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post was not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    return console.log(error);
  }
};

const updatePostById = async (req, res) => {
  const id = req.params.id;
  const { title, description, image, location, date } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !image &&
    image.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  let post;

  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
    });
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Post updated successfully" });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  let post;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    post = await Post.findById(id).populate("user");
    post.user.posts.pull(post);
    await post.user.save({session})
    post = await Post.findByIdAndDelete(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  {
    return res.status(200).json({ message: "Post deleted successfuly" });
  }
};

module.exports = {
  getAllPosts,
  addPost,
  getPostById,
  updatePostById,
  deletePost,
};
