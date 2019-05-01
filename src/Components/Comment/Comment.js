import React, { Component } from "react";
import "../Comment/Comment.scss";
import axios from "axios";

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    axios.get(`/api/comment/${this.props.post_id}`).then(comments => {
      this.setState({ comments: comments.data });
    });
  }
  render() {
    // console.log("LOOKING FOR ME?", this.state);
    const { comments } = this.state;

    const mappedComments = comments.map(comment => {
      return <div key={comment.comment_id}>{comment.comment}</div>;
    });
    return <div className="comment-container">{mappedComments}</div>;
  }
}

export default Comment;
