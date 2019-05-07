import React, { Component } from "react";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import PostForm from "../PostForm/PostForm";
import { connect } from "react-redux";
import { setComment } from "../../ducks/commentReducer";
import { setPost } from "../../ducks/postReducer";
import axios from "axios";
import ReactPlayer from "react-player";
import Sound from "react-sound";
import "../Post/Post.scss";

class Post extends Component {
  constructor() {
    super();

    this.state = {
      comments: [],
      likes: 0,
      toggle: false
    };
  }

  componentDidMount() {
    this.getComment();
  }

  incrementMe = () => {
    let newCount = this.state.likes + 1;
    this.setState({
      likes: newCount
    });
  };

  getComment = () => {
    const { post_id } = this.props;
    axios.get(`/api/comment/${post_id}`).then(comments => {
      console.log("this is the response---->", comments);
      // this.props.setComment(comments.data);
      this.setState({ comments: comments.data.reverse() });
    });
  };

  delete = e => {
    const { post_id } = this.props;
    // console.log("_-_-_", this.props);
    axios.delete(`/api/posts/${post_id}`).then(post => {
      console.log("POST", post);

      this.props.setPost(post.data.reverse());
    });
  };

  // editPost = post_id => {
  //   const { content } = this.props.post;

  //   axios.put(`/api/posts/${content}?post_id=${post_id}`).then(post => {
  //     this.props.setPost(post.data.reverse());
  //   });
  // };

  toggle = post_id => {
    this.setState({
      toggle: !this.state.toggle
    });
  };

  changeHandler = e => {
    this.setState({
      newVal: e.target.value
    });
  };

  fileChecker = file => {
    return file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
  };
  //   const { cloudinary_url } = this.props;
  //   file = "";
  //   let image = cloudinary_url.includes(".jpeg");
  //   let audio = cloudinary_url.includes(".mp3");
  //   let video = cloudinary_url.includes(".mp4");

  //   if (video) {
  //     return video, "video";
  //   } else if (audio) {
  //     return audio, "audio";
  //   } else {
  //     return image, "image";
  //   }
  // };

  render() {
    console.log("This.proPs ??", this.props);

    const {
      post_id,
      content,
      username,
      profile_pic_cloud,
      created_at,
      cloudinary_url
    } = this.props;
    console.log("CLOUD", cloudinary_url);

    const { comment_id } = this.props.comment;
    const { comments } = this.state;
    // console.log("I AM THE POST_ID", post_id);
    // var image = cloudinary_url.includes(".jpeg");
    return (
      <div>
        <div className="post-container" key={post_id}>
          <div className="user-time">
            <div>
              <h3 className="username">{username}</h3>
              {/* Shared a Post */}
              <img
                className="profile-pic-post"
                src={profile_pic_cloud}
                alt=""
              />
            </div>
            <h6>{created_at}</h6>
          </div>

          <h5>{content}</h5>

          {cloudinary_url === null ? null : this.fileChecker(cloudinary_url) ===
              "jpg" || this.fileChecker(cloudinary_url) === "png" ? (
            <img id="cloud" alt="" src={cloudinary_url} />
          ) : this.fileChecker(cloudinary_url) === "mp4" ||
            this.fileChecker(cloudinary_url) === "quicktime" ? (
            <div>
              <ReactPlayer
                className="video-player"
                url={cloudinary_url}
                playing={false}
                controls={true}
                height="100%"
                width="100%"
              />
            </div>
          ) : (
            <div>
              {/* <Sound url={cloudinary_url} playstatus={Sound.status.playing} > </Sound> */}
              <audio
                className="audio"
                ref="audio_tag"
                src={cloudinary_url}
                controls
                // autoPlay
              />
            </div>
          )}

          {}
          <CommentForm user_post={post_id} getComment={this.getComment} />
          {/* {comment ? ( */}
          <Comment
            comments={comments}
            comment_id={comment_id}
            post_id={post_id}
            getComment={this.getComment}
          />
          {/* ) : null} */}
          <button className="delete-post" onClick={e => this.delete(e)}>
            delete post
          </button>

          {this.state.toggle ? (
            <button onClick={() => this.saveEdit(this.state.newVal, post_id)}>
              save edit
            </button>
          ) : (
            <button className="edit-post" onClick={e => this.editPost(post_id)}>
              edit post
            </button>
          )}

          {this.state.toggle ? (
            <div>
              <PostForm />
              <input
                className="input-edit"
                onChange={e => this.changeHandler(e)}
              />
            </div>
          ) : null}

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
