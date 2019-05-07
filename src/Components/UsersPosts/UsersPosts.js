import React, { Component } from "react";
import "../UsersPosts/UsersPosts.scss";
import { setPost } from "../../ducks/postReducer";
import { connect } from "react-redux";
import axios from "axios";
import Comment from "../Comment/Comment";

class UsersPosts extends Component {
  componentDidMount() {
    this.getMyPosts();
  }

  getMyPosts = id => {
    axios.get(`/api/posts/${id}`).then(posts => {
      this.props.setPost(posts.data.reverse());
    });
  };

  render() {
    console.log("Lookie here", this.props);

    const {
      post_id,
      content,
      username,
      profile_pic_cloud,
      created_at,
      cloudinary_url
    } = this.props;
    return (
      <div>
        <div className="user1-post-container" key={post_id}>
          <div className="user1-user-time">
            <div>
              <h3 className="user1-username">{username}</h3>
              {/* Shared a Post */}
              <img
                className="user1-profile-pic-post"
                src={profile_pic_cloud}
                alt=""
              />
            </div>
            <h6>{created_at}</h6>
          </div>

          <h5>{content}</h5>

          {cloudinary_url ? (
            <img id="user1-cloud" alt="" src={cloudinary_url} />
          ) : null}
          {/* <CommentForm user_post={post_id} getComment={this.getComment} /> */}
          {/* {comment ? ( */}
          {/* <Comment
            comments={comments}
            comment_id={comment_id}
            post_id={post_id}
            getComment={this.getComment}
          />
          ) : null} */}
          {/* <button className="delete" onClick={e => this.delete(e)}>
            delete post
          </button>
          <button onClick={this.incrementMe}>Likes : {this.state.likes}</button> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setPost: setPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPosts);
