const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const aC = require("./controllers/authController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");

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

// auth paths:

app.post("/auth/login", aC.login);
app.post("/auth/register", aC.register);
app.get("/auth/logout", aC.logout);

app.get("/auth/usersession", (req, res) => {
  res.status(200).send(req.session.user);
});

// users:
app.put("/api/userprofile/:id", aC.addInfo);

// post paths:

app.get("/api/posts", postController.getPosts);
app.get("/api/posts/:id", postController.getPost);
app.post("/api/posts", postController.createPost);
app.put("/api/posts/:id", postController.editPost);
app.delete("/api/posts/:id", postController.deletePost);
//(`/api/posts/${id}`)

// comment paths:

app.get("/api/comment", commentController.getComments);
app.post("/api/comment", commentController.commentOnPost);
app.put("/api/comment/:id", commentController.editComment);
app.delete("/api/comment/:id", commentController.deleteComment);

app.listen(
  SERVER_PORT,
  console.log(`The server is in da house on ${SERVER_PORT}`)
);
