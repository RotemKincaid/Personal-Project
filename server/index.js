const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const aC = require("./controllers/authController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");
const cloudinary = require("cloudinary");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  //   db.init();
  console.log("Connected to db");
});

app.use(express.static(`${__dirname}/../build`));

// auth paths:

app.post("/auth/login", aC.login);
app.post("/auth/register", aC.register);
app.get("/auth/logout", aC.logout);

app.get("/auth/usersession", (req, res) => {
  res.status(200).send(req.session.user);
});
app.get("/user/profile/:id", aC.getProfile);

// users:
app.put("/api/userprofile/:id", aC.addInfo);

// post paths:

app.get("/api/posts", postController.getPosts);
app.get("/api/posts/:id", postController.getPost);
app.post("/api/posts", postController.createPost);
app.put("/api/posts/:id", postController.editPost);
app.delete("/api/posts/:id", postController.deletePost);

//get posts by user id
app.get("/api/posts/:id", postController.getPostByUser);
//(`/api/posts/${id}`)

// comment paths:

app.get("/api/comment/:id", commentController.getComments);

app.post("/api/comment", commentController.commentOnPost);
app.put("/api/comment/:id", commentController.editComment);
app.delete("/api/comment/:comment_id", commentController.deleteComment);

app.get("/api/upload", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const api_secret = process.env.CLOUDINARY_SECRET_API;

  const signature = cloudinary.utils.api_sign_request(
    { timestamp: timestamp },
    api_secret
  );

  const payload = {
    signature: signature,
    timestamp: timestamp
  };
  res.json(payload);
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(
  SERVER_PORT,
  console.log(`The server is in da house on ${SERVER_PORT}`)
);
