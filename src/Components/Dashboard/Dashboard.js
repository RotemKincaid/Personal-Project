import React, { Component } from "react";
import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";
import axios from "axios";

import "../Dashboard/Dashboard.scss";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      postHistory: []
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    axios.get("/api/posts").then(res => {
      this.setState({
        postHistory: res.data
      });
    });
  };

  render() {
    const { postHistory } = this.state;
    const mappedPosts = postHistory.map(post => {
      console.log(post);
      return (
        <div key={post.post_id}>
          <Post content={post.post_content} file={post.file} />
        </div>
      );
    });
    return (
      <div className="outer-container">
        <div className="inner-container">
          <PostForm />
          This is the Dashboard {mappedPosts}
        </div>
        <h6>Photo by Vishnu R Nair from Pexels</h6>
      </div>
    );
  }
}

export default Dashboard;
