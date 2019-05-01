import React, { Component } from "react";
import { setComment } from "../../ducks/commentReducer";
import { connect } from "react-redux";
import axios from "axios";
import "../CommentForm/CommentForm.scss";

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      comment: "",
      like: false,
      follow: false
    };
  }

  commentHandler = e => {
    this.setState({
      comment: e.target.value
    });
  };

  comment = e => {
    const { comment } = this.state;
    // find where these come from! --->
    const { comment_id, user_post } = this.props;
    console.log("another label!", this.props);
    console.log("I am your MOTHER!", user_post);

    axios
      .post("/api/comment", {
        comment: comment,
        comment_id: comment_id,
        user_post: user_post
      })
      .then(comment => {
        console.log("I am your father!!!", comment);

        this.props.setComment(comment.data.reverse());
        this.setState({
          comment: ""
        });
      });
  };
  render() {
    console.log(this.props);

    return (
      <div>
        <input
          value={this.state.comment}
          placeholder="Comment here..."
          onChange={e => this.commentHandler(e)}
        />
        <button onClick={e => this.comment(e)}>save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setComment: setComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
