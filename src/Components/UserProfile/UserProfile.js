import React, { Component } from "react";
import ProfileForm from "../ProfileForm/ProfileForm";
import Comment from "../Comment/Comment";

import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import { setPost } from "../../ducks/postReducer";

import { Link } from "react-router-dom";
import UsersPosts from "../UsersPosts/UsersPosts";
import "../UserProfile/UserProfile.scss";
import axios from "axios";

import Dropzone from "react-dropzone";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/durwtlqt9/image/upload";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loggedInUser: "",
      fullName: "",
      talent: "",
      genre: "",
      influence: "",
      profile_pic_cloud: "",
      // cloudinary_url: [],
      uploadedFile: "",
      isEditing: false
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    this.getMyProfile();
    // }, 500);
  }

  getMyProfile = user_id => {
    axios.get(`/user/profile/${this.props.user.user.user_id}`).then(user => {
      this.props.setUser(user.data);
    });
  };

  // getMyPosts = id => {
  //   axios.get(`/api/posts/${id}`).then(posts => {
  //     this.props.setPost(posts.data.reverse());
  //   });
  // };

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
            profile_pic_cloud: [
              ...this.state.profile_pic_cloud,
              response.data.secure_url
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  nameHandler = e => {
    // e.preventDefault();
    this.setState({
      fullName: e.target.value
    });
  };

  talentHandler = e => {
    this.setState({
      talent: e.target.value
    });
  };

  genreHandler = e => {
    this.setState({
      genre: e.target.value
    });
  };

  influenceHandler = e => {
    this.setState({
      influence: e.target.value
    });
  };

  picHandler = e => {
    this.setState({
      profile_pic_cloud: e.target.value
    });
  };

  editHandler = e => {
    this.setState({
      isEditing: true
    });
  };

  submit = e => {
    const { user_id } = this.props.user.user;
    console.log(this.props.user.user);

    const {
      fullName,
      talent,
      genre,
      influence,
      profile_pic_cloud
    } = this.state;
    e.preventDefault();

    let updateUserValues = {
      fullName: fullName !== "" ? fullName : this.props.user.user.full_name,
      talent: talent !== "" ? talent : this.props.user.user.talent,
      genre: genre !== "" ? genre : this.props.user.user.genre,
      influence: influence !== "" ? influence : this.props.user.user.influence,
      profile_pic_cloud:
        profile_pic_cloud !== ""
          ? profile_pic_cloud[0]
          : this.props.user.user.profile_pic_cloud
    };
    console.log("SEAN", updateUserValues);

    axios.put(`/api/userprofile/${user_id}`, updateUserValues).then(profile => {
      console.log("PROFILE", profile);

      // this.props.setUser(profile.data);
      this.getMyProfile();
      this.setState({
        isEditing: false
      });
    });
    // this.setState({
    //   fullName: "",
    //   talent: "",
    //   genre: "",
    //   influence: "",
    //   profile_pic_cloud: ""
    // });
  };

  render() {
    console.log("LABEL", this.props);

    const {
      fullName,
      talent,
      genre,
      influence,
      profile_pic_cloud
    } = this.props.user;
    // {
    //   user ? console.log("USER?", user.full_name) : console.log("no user");
    // }
    const { user } = this.props.user;
    // const { post } = this.props.post;
    // const { comment } = this.props.comment;
    // const mappedUserPosts = post.map(post => {
    //   return (
    //     <div key={post.post_id}>
    //       <UsersPosts
    //         post_id={post.post_id}
    //         content={post.post_content}
    //         // file={post.file}
    //         profile_pic_cloud={post.profile_pic_cloud}
    //         username={post.username}
    //         created_at={post.created_at}
    //         cloudinary_url={post.cloudinary_url}
    //       />
    //       <Comment
    //         comments={comment.comments}
    //         comment_id={comment.comment_id}
    //         post_id={comment.post_id}
    //         getComment={this.getComment}
    //       />
    //       {/* <CommentForm />
    //       <Comment comment={this.props.comment.comment} /> */}
    //     </div>
    //   );
    // });

    return (
      <div className="user-profile">
        {user.username ? (
          <div className="inner-user-profile">
            <h1 className="user-name">{user.username}'s Profile</h1>
            <div className="profile-pic">
              {user.profile_pic_cloud && this.state.isEditing === false ? (
                <div>
                  <img
                    className="cloudinary-profile"
                    src={user.profile_pic_cloud}
                  />
                  {/* <button>edit profile picture</button> */}
                </div>
              ) : (
                <Dropzone
                  onDrop={this.onImageDrop}
                  accept="image/*"
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p id="dropzone">
                          Click to select files, or drop file here
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
              {/* {user.profile_pic_cloud && this.state.isEditing === true ? (
              <div>
              <img
                className="cloudinary-profile"
                src={user.profile_pic_cloud}
              />
              
            </div>)
            } */}
            </div>
            <div className="little-containers">
              {user.full_name && this.state.isEditing === false ? (
                <div>
                  <h1>My full name is</h1>
                  <h3>{user.full_name}</h3>
                </div>
              ) : (
                <div>
                  full name
                  <input
                    placeholder="what is your full name?"
                    onChange={e => this.nameHandler(e)}
                  />
                </div>
              )}
              {user.talent && this.state.isEditing === false ? (
                <div>
                  <h1>My talent is</h1>
                  <h3>{user.talent}</h3>
                </div>
              ) : (
                <div>
                  talent
                  <input
                    placeholder="what is your talent?"
                    onChange={e => this.talentHandler(e)}
                  />
                </div>
              )}

              {user.influence && this.state.isEditing === false ? (
                <div>
                  <h1>My influence is</h1>
                  <h3>{user.influence}</h3>
                </div>
              ) : (
                <div>
                  influences
                  <input
                    placeholder="what is your influence?"
                    onChange={e => this.influenceHandler(e)}
                  />
                </div>
              )}

              {user.genre && this.state.isEditing === false ? (
                <div>
                  <h1>My genre is</h1>
                  <h3>{user.genre}</h3>
                </div>
              ) : (
                <div>
                  genres
                  <input
                    placeholder="what is your genre?"
                    onChange={e => this.genreHandler(e)}
                  />
                </div>
              )}
            </div>
            <br />
            <div className="container-under">
              {this.state.isEditing === true ? (
                <button
                  className="complete-profile"
                  onClick={e => this.submit(e)}
                >
                  <Link to="/userprofile">Complete Profile! </Link>
                </button>
              ) : (
                <button
                  className="edit-profile"
                  onClick={e => this.editHandler(e)}
                >
                  Edit Profile
                </button>
              )}
              {/* <div className="my-posts">
            My posts
            {id => this.getMyPosts(id)}
          </div> */}
            </div>

            {/* <img src={}>*/}
            {/* {user ? (
          <ProfileForm
            fullName={user.full_name}
            talent={user.talent}
            genre={user.genre}
            influence={user.influence}
            profile_pic={user.profile_pic}
          />
        ) : (
          <div> Please Log in! </div>
        )} */}
            {/* <div>This is your completed profile</div> */}

            {/* <div className="myPosts">{mappedUserPosts}</div> */}
          </div>
        ) : (
          <div className="please-log-in">
            <h1>Please log in to see your profile!</h1>
            {/* <br />
            <Link to="/login"> click here to log in </Link> */}
          </div>
        )}
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
