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
    const { username, password } = req.body;
    const db = req.app.get("db");

    let userFound = await db.check_user_exists(username);
    if (!userFound[0]) {
      res.status(200).send("username not found, please try again!");
    }
    let result = bcrypt.compare(password, userFound[0].hashed_password);
    console.log(userFound);

    if (result) {
      req.session.user = {
        user_id: userFound[0].user_id,
        username: userFound[0].username,
        profile_pic: userFound[0].profile_pic
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
    const { fullName, talent, genre, influence, profile_pic } = req.body;
    const { id } = req.params;

    db.update_user([fullName, talent, genre, influence, profile_pic, id]);
  },
  getProfile: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.get_user_profile([id]).then(user => {
      res.status(200).send(user);
    });
  }
};
