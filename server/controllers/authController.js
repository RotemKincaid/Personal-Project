const bcrypt = require("bcrypt");

module.exports = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    const db = req.app.get("db");
    console.log("RANDOM");
    // db.check_user_exists(username).then(user => {
    //   if (user.length) {
    //     res.status(200).send("This username already exists in the database");
    //   } else {
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds).then(salt => {
      bcrypt.hash(password, salt).then(hashedPassword => {
        db.create_user([username, email, hashedPassword]).then(logInUSer => {
          console.log(logInUSer);
          req.session.user = {
            user_id: logInUSer[0].user_id,
            username: logInUSer[0].username,
            profile_pic: logInUSer[0].profile_pic
          };
          res.status(200).send(req.session.user);
        });
      });
    });
    //   }
    // });
  },

  login: async (req, res) => {
    const { userName, password } = req.body;
    const db = req.app.get("db");
    console.log(req.body);

    let userFound = await db.check_user_exists(userName);
    if (!userFound[0]) {
      res.status(200).send("username not found, please try again!");
    }
    console.log(userFound);
    let result = bcrypt.compare(password, userFound[0].hashed_password);

    if (result) {
      req.session.user = {
        user_id: userFound[0].user_id,
        username: userFound[0].username,
        profile_pic_cloud: userFound[0].profile_pic_cloud,
        talent: userFound[0].talent,
        fullName: userFound[0].fullName,
        genre: userFound[0].genre,
        influence: userFound[0].influence
      };
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send("incorrect username/password");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  addInfo: (req, res) => {
    console.log(req.body);
    const db = req.app.get("db");
    const { fullName, talent, genre, influence, profile_pic_cloud } = req.body;
    const { id } = req.params;

    db.update_user([fullName, talent, genre, influence, profile_pic_cloud, id])
      .then(user => {
        res.status(200).send(user[0]);
      })
      .catch(err => {
        console.log("an Error on the backend!", err);
      });
  },
  getProfile: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log(req.params);
    db.get_user_profile([id])
      .then(user => {
        console.log("user ===>", user);
        res.status(200).send(user[0]);
      })
      .catch(err => {
        console.log(">->->->", err);
      });
  }
};
