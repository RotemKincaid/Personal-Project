import React, { Component } from "react";

class Post extends Component {
  render() {
    const { post_id, title, content, file } = this.props;
    return (
      <div>
        <div key={post_id}>
          <h3>{title}</h3>
          <h5>{content}</h5>
          <h4>{file}</h4>
        </div>
      </div>
    );
  }
}

export default Post;
