import React, { Component } from "react";
import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";
import axios from "axios";
import { connect } from "react-redux";
import { setPost } from "../../ducks/postReducer";

import "../Dashboard/Dashboard.scss";

class Dashboard extends Component {
  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    axios.get("/api/posts").then(posts => {
      //
      this.props.setPost(posts.data.reverse());
    });
  };

  render() {
    console.log(this.props);
    const { post } = this.props.post;

    const mappedPosts = post.map(post => {
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
          What's new in the StageR Feed?{mappedPosts}
        </div>
        <h6>Photo by Vishnu R Nair from Pexels</h6>
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
)(Dashboard);
