import React, { Component } from "react";
import { setPost } from "../../ducks/postReducer";
import { connect } from "react-redux";
import "../PostForm/PostForm.scss";
import axios from "axios";
import { withRouter } from "react-router";

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      content: "",
      file: ""
    };
  }

  postHandler(e) {
    this.setState({
      content: e.target.value
    });
  }

  fileHandler(e) {
    this.setState({
      file: e.target.value
    });
  }

  createPost(e) {
    const { content, file } = this.state;
    const { user_id } = this.props.user.user;
    axios
      .post("/api/posts", {
        post_content: content,
        file: file,
        user_id: user_id
      })
      .then(posts => {
        this.props.setPost(posts.data.reverse());
        // this.props.history.push("/dashboard");
      });
  }

  render() {
    console.log(this.props);

    return (
      <div className="form-container">
        <div>(Profile picture)</div>
        <br />
        <input
          className="post-input"
          onChange={e => this.postHandler(e)}
          placeholder="your post goes here"
        />
        <input
          placeholder="file goes here"
          onChange={e => this.fileHandler(e)}
        />
        <br />
        <button className="post-btn" onClick={e => this.createPost(e)}>
          post
        </button>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostForm)
);
