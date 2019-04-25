# StageR!

## Back-end

### dependencies:

- express
- express session
- massive
- dotenv
- bcrypt
- express-session

my endpoints:

posts:

app.get('/api/posts', postController.getPosts) ---> Get all posts on feed
app.get('/api/posts/:id', postController.getPost) ---> Get one post
app.post('/api/posts', postController.createPost) ---> Create a new post
app.put('/api/posts/:id, postController.editPost) ---> edit existing post
app.delete('/api/posts/:id, postController.deletePost) ---> delete the post

auth:

app.post('/auth/login', authController.login) ---> Login/ Sign in
app.post('/auth/register', authController.register) ---> Register/Create a profile
app.get('/auth/logout', authController.logout) ---> user log out

comments:

app.post('/api/comment', commentController.commentOnPost) ---> comment on a post
app.put('/api/comment/:id', commentController.editComment) ---> Edit your comment
app.delete('/api/comment/:id, commentController.deleteComment) ---> Delete comment

### server file structure:

- /server
  - index.js
  - controllers/
    - authController.js
    - postController.js
    - commentController.js

### dotenv file

```text
SESSION_SECRET=
SERVER_PORT=
CONNECTION_STRING= (append => ?ssl=true)
```

## Front-end!

### dependencies:

- axios
- react-router-dom
- redux
- react-redux
- redux-promise-middleware

### Components and file structure

- App.js

#### Components/

- Header/
  - Header.js
  - Header.scss
- Dashboard/
  - Dashboard.js
  - Dashboard.scss
- Feed/
  - Feed.js
  - Feed.scss
- Post/
  - Post.js
  - Post.scss
- Comment/
  - Comment.js
  - Comment.scss
- NavBar/
  - NavBar.js
  - NavBar.scss
- UserProfile/
  - UserProfile.js
  - UserProfile.scss
- Welcome/
  - Welcome.js
  - Welcome.scss
- Login/
  - Login.js
  - Login.scss
- Register/
  - Register.js
  - Register.scss
- SearchBar/

  - SearchBar.js
  - SearchBar.scss

  Ducks/

  - store.js
  - reducer.js
    (multiple reducers?!)
