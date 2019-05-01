import React, { Component } from "react";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import { connect } from "react-redux";
import { setComment } from "../../ducks/commentReducer";
import { setPost } from "../../ducks/postReducer";
import axios from "axios";
import "../Post/Post.scss";

class Post extends Component {
  constructor() {
    super();

    this.state = {
      likes: 0
    };
  }

  incrementMe = () => {
    let newCount = this.state.likes + 1;
    this.setState({
      likes: newCount
    });
  };

  delete = e => {
    const { post_id } = this.props;
    // console.log("_-_-_", this.props);
    axios.delete(`/api/posts/${post_id}`).then(post => {
      this.props.setPost(post.data);
    });
  };

  render() {
    console.log(this.props);

    const {
      post_id,
      content,
      file,
      username,
      profile_pic,
      created_at,
      cloudinary_url
    } = this.props;
    const { comment } = this.props.comment;
    console.log("I AM THE POST_ID", post_id);
    return (
      <div>
        <div className="post-container" key={post_id}>
          <div className="user-time">
            <div>
              <h3>{username}</h3>
              <img src={profile_pic} alt="" />
            </div>
            <h6>{created_at}</h6>
          </div>

          <h5>{content}</h5>

          {cloudinary_url ? (
            <img id="cloud" alt="" src={cloudinary_url} />
          ) : null}
          <CommentForm user_post={post_id} />
          <Comment comment={comment} post_id={post_id} />
          <button className="delete" onClick={e => this.delete(e)}>
            delete post
          </button>
          <button onClick={this.incrementMe}>Likes : {this.state.likes}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setComment: setComment,
  setPost: setPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
