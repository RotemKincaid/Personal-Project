import React, { Component } from "react";
import ProfileForm from "../ProfileForm/ProfileForm";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import "../UserProfile/UserProfile.scss";
// import axios from "axios";

// import Dropzone from "react-dropzone";
// const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/durwtlqt9/image/upload";

class UserProfile extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     cloudinary_url: [],
  //     uploadedFile: ""
  //   };
  // }
  onImageDrop = files => {
    console.log("onImageDrop FILES", files);
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  };

  // handleImageUpload = file => {
  //   axios.get("/api/upload").then(response => {
  //     let formData = new FormData();
  //     formData.append("signature", response.data.signature);
  //     formData.append("api_key", "742439171821394");
  //     formData.append("timestamp", response.data.timestamp);
  //     formData.append("file", file);

  //     axios
  //       .post(CLOUDINARY_UPLOAD_URL, formData)
  //       .then(response => {
  //         console.log(">>>>>>>", response);

  //         this.setState({
  //           cloudinary_url: [
  //             ...this.state.cloudinary_url,
  //             response.data.secure_url
  //           ]
  //         });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // };

  render() {
    console.log("LABEL", this.props.user);

    const { user } = this.props.user;
    {
      user ? console.log("USER?", user.full_name) : console.log("no user");
    }
    return (
      <div>
        {user ? (
          <ProfileForm
            fullName={user.full_name}
            talent={user.talent}
            genre={user.genre}
            influence={user.influence}
            profile_pic={user.profile_pic}
          />
        ) : (
          <div> Please Log in! </div>
        )}
        <div>This is your completed profile</div>

        <div>{/* <h1>{user.username}</h1> */}</div>
        {/* <Dropzone onDrop={this.onImageDrop} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p id="dropzone">Click to select files, or drop file here</p>
              </div>
            </section>
          )}
        </Dropzone>
        <img id="cloud" src={this.state.cloudinary_url} /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setUser: setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
