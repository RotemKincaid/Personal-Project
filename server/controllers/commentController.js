module.exports = {
  getComments: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.get_comments([id])
      .then(comments => {
        res.status(200).send(comments);
      })
      .catch(err => {
        console.log("Error in get_comments.sql!");
        res
          .status(500)
          .send({ message: "An Error has occurred on the server", err });
      });
  },

  commentOnPost: (req, res) => {
    const db = req.app.get("db");
    const { comment, user_post } = req.body;
    console.log("******", req.body);

    // req.session.user = {
    //   id: 1
    // };
    const userId = req.session.user.user_id;
    console.log("USER ID", userId);

    // console.log(typeof user_post);
    db.comment_on_post([comment, userId, user_post])
      .then(comments => {
        res.status(200).send(comments);
      })
      .catch(err => {
        console.error("Error in comment_on_post sql", err);
        res
          .status(500)
          .send({ message: "An Error has occurred on the server", err });
      });
  },

  editComment: (req, res) => {
    const { id } = req.params;
    if (!id) {
      id = req.query.id;
    }

    if (!id) {
      return res
        .status(400)
        .send({ message: "Invalid or missing 'id' on request" });
    }

    const db = req.app.get("db");
    const { comment_id, comment } = req.body;
    // req.session.user = {
    //   id: 1
    // };
    // const userId = req.session.user.id;

    db.edit_comment([comment_id, comment])
      .then(comments => {
        res.status(200).send(comments);
      })
      .catch(err => {
        console.error("Error in edit_comment sql", err);
        res.status(500).send({ message: "Error on the server", err });
      });
  },
  deleteComment: (req, res) => {
    let { comment_id } = req.params;
    let { post_id } = req.query;

    console.log(comment_id);
    console.log(post_id);

    // if (!parseInt(comment_id)) {
    //   return res
    //     .status(400)
    //     .send({ message: "an error in delete_comment sql" });
    // }

    const db = req.app.get("db");
    db.delete_comment([comment_id, post_id])
      .then(comments => {
        console.log(comments);

        res.status(200).send(comments);
      })
      .catch(err => {
        console.error("Error in delete_comment sql", err);
        res.status(500).send({ message: "error on the server" });
      });
  }
};
