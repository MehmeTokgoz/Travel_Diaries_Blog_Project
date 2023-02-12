const express = require("express");
const app = express();
const connection = require("./modules/connection");
const PORT = process.env.PORT || 4000;
const bodyparser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/userRoute");
const postRouter = require("./routers/postRoute")

app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);


//Middleware 
app.use("/user", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => console.log(`Service up and running and ${PORT}`));