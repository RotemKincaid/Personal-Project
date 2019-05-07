import React, { Component } from "react";
import { setPost } from "../../ducks/postReducer";
import { connect } from "react-redux";
import "../PostForm/PostForm.scss";
import axios from "axios";
import { withRouter } from "react-router";
import Dropzone from "react-dropzone";
// import loading from "../PostForm/loading.gif";

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      content: "",
      cloudinary_url: [],
      uploadedFile: "",
      isLoading: false
    };
  }
  onImageDrop = files => {
    console.log("onImageDrop FILES", files);
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    axios.get("/api/upload").then(response => {
      let formData = new FormData();
      formData.append("signature", response.data.signature);
      formData.append("api_key", "742439171821394");
      formData.append("timestamp", response.data.timestamp);
      formData.append("file", file);

      console.log("the FILE", file);

      let CLOUDINARY_UPLOAD_URL = "";
      if (file.type === "audio/mp3" || file.type === "audio/wav") {
        CLOUDINARY_UPLOAD_URL =
          "https://api.cloudinary.com/v1_1/durwtlqt9/video/upload";
      } else if (file.type === "video/mp4" || file.type === "video/quicktime") {
        CLOUDINARY_UPLOAD_URL =
          "https://api.cloudinary.com/v1_1/durwtlqt9/video/upload";
      } else {
        CLOUDINARY_UPLOAD_URL =
          "https://api.cloudinary.com/v1_1/durwtlqt9/image/upload";
      }

      axios
        .post(CLOUDINARY_UPLOAD_URL, formData)
        .then(response => {
          console.log(">>>>>>>", response);

          this.setState({
            cloudinary_url: [
              ...this.state.cloudinary_url,
              response.data.secure_url
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  postHandler(e) {
    this.setState({
      content: e.target.value
    });
  }

  // fileHandler(e) {
  //   this.setState({
  //     file: e.target.value
  //   });
  // }

  createPost(e) {
    const { content, cloudinary_url } = this.state;
    const { user_id } = this.props.user.user;
    console.log("staaaaaaate", this.state);

    // if ((this.props.post.post = null))
    axios
      .post("/api/posts", {
        post_content: content,

        cloudinary_url: cloudinary_url,
        user_id: user_id
      })
      .then(posts => {
        this.props.setPost(posts.data);
        // this.props.history.push("/dashboard");
        this.setState({
          content: "",

          cloudinary_url: ""
        });

        alert("file is uploading! this might take a few minutes");
      });
  }

  render() {
    console.log("THIS DOT PROPS", this.props);
    console.log(this.state);
    // const { profile_pic } = this.props.user.user;
    const { cloudinary_url } = this.state;
    return (
      <div className="form-container">
        {/* <img src={profile_pic} alt="" /> */}
        <br />
        <input
          value={this.state.content}
          className="post-input"
          onChange={e => this.postHandler(e)}
          placeholder="post something new..."
        />

        {!cloudinary_url[0] ? (
          <Dropzone
            onDrop={this.onImageDrop}
            accept={["image/*", "video/*", "audio/*"]}
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p id="dropzone">Click to select files, or drop file here</p>
                </div>
              </section>
            )}
          </Dropzone>
        ) : (
          <img className="preview" src={cloudinary_url[0]} alt="" />
        )}
        {/* {!this.state.isLoading ? null :  */}
        {/* {!cloudinary_url.length > 0 ? (
          <div>
            <img
              id="loading"
              src="https://media0.giphy.com/media/VlJkP9Vxi4nkI/giphy.gif"
              alt="Uploading file... this might take a few minutes!"
            />
          </div>
        ) : ( */}
        <button className="post-btn" onClick={e => this.createPost(e)}>
          post
        </button>
        {/* )} */}
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
