const mongoose = require("../modules/connection")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        minLength: 6,
    },
    location:
        {
            type: String,
            required: true,
        },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId, ref: "User",
        required: true,
    },
    
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;