import React, { Component } from "react";
import { setPost } from "../../ducks/postReducer";
import { connect } from "react-redux";
import "../PostForm/PostForm.scss";
import axios from "axios";
import { withRouter } from "react-router";
import Dropzone from "react-dropzone";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/durwtlqt9/image/upload";

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      content: "",
      file: "",
      cloudinary_url: [],
      uploadedFile: ""
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
    const { content, file, cloudinary_url } = this.state;
    const { user_id } = this.props.user.user;
    console.log("staaaaaaate", this.state);

    axios
      .post("/api/posts", {
        post_content: content,
        file: file,
        cloudinary_url: cloudinary_url,
        user_id: user_id
      })
      .then(posts => {
        this.props.setPost(posts.data.reverse());
        // this.props.history.push("/dashboard");
        this.setState({
          content: "",
          file: ""
        });
      });
  }

  render() {
    console.log(this.props);
    // const { profile_pic } = this.props.user.user;

    return (
      <div className="form-container">
        {/* <img src={profile_pic} alt="" /> */}
        <br />
        <input
          value={this.state.content}
          className="post-input"
          onChange={e => this.postHandler(e)}
          placeholder="your post goes here"
        />
        {/* <input
          value={this.state.file}
          placeholder="file goes here"
          onChange={e => this.fileHandler(e)}
        /> */}
        <Dropzone onDrop={this.onImageDrop} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p id="dropzone">Click to select files, or drop file here</p>
              </div>
            </section>
          )}
        </Dropzone>
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
