import React, { Component } from "react";
import "../Comment/Comment.scss";
import axios from "axios";
import { setComment } from "../../ducks/commentReducer";
import { connect } from "react-redux";

class Comment extends Component {
  constructor() {
    super();

    this.state = {
      comments: []
    };
  }

  // componentDidMount() {
  //   this.getComment();
  // }

  // getComment = () => {
  //   const { post_id } = this.props;
  //   axios.get(`/api/comment/${post_id}`).then(comments => {
  //     console.log("this is the response---->", comments);
  //     // this.props.setComment(comments.data);
  //     this.setState({ comments: comments.data });
  //   });
  // };

  deleteComment = comment_id => {
    // console.log("DO I HAVE ACCESS?", this.props);
    const { post_id } = this.props;

    axios.delete(`/api/comment/${comment_id}?post_id=${post_id}`).then(res => {
      console.log(res.data);
      this.props.getComment();
      this.props.setComment(res.data);
    });
  };

  render() {
    console.log(this.props);

    console.log("LOOKING FOR ME?", this.state);
    const { comments } = this.props;

    // const { comment } = this.props.comment;

    const mappedComments = comments.map(comment => {
      console.log("labeling for Hunter", comment);
      return (
        <div className="comments" key={comment.comment_id}>
          <div className="time-and-user">
            <h3>{comment.username} commented:</h3>
            <h6>{comment.created_at}</h6>
          </div>
          <img className="profile_pic" src={comment.profile_pic_cloud} alt="" />
          <div className="content-and-delete">
            <h6 className="content">{comment.comment}</h6>
            <button
              className="delete-comment"
              onClick={() => this.deleteComment(comment.comment_id)}
            >
              delete comment
            </button>
          </div>
        </div>
      );
    });
    // {mappedComments.length > 0 ? (
    return (
      <div>
        {comments.length > 0 ? (
          <div className="comment-container">comments{mappedComments} </div>
        ) : (
          <div />
        )}
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
)(Comment);
