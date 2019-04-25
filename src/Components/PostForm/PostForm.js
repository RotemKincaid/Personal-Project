import React, { Component } from "react";
import "../PostForm/PostForm.scss";

class PostForm extends Component {
  render() {
    return (
      <div className="form-container">
        <div>(Profile picture)</div>
        <br />
        <input placeholder="your post goes here" />
        <button>post</button>
      </div>
    );
  }
}

export default PostForm;
