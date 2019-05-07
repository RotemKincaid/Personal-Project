// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../ProfileForm/ProfileForm.scss";

// import Dropzone from "react-dropzone";
// const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/durwtlqt9/image/upload";

// class ProfileForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       // loggedInUser: "",
//       fullName: "",
//       talent: "",
//       genre: "",
//       influence: "",
//       profile_pic: "",
//       cloudinary_url: [],
//       uploadedFile: ""
//     };
//   }

//   onImageDrop = files => {
//     console.log("onImageDrop FILES", files);
//     this.setState({
//       uploadedFile: files[0]
//     });

//     this.handleImageUpload(files[0]);
//   };

//   handleImageUpload = file => {
//     axios.get("/api/upload").then(response => {
//       let formData = new FormData();
//       formData.append("signature", response.data.signature);
//       formData.append("api_key", "742439171821394");
//       formData.append("timestamp", response.data.timestamp);
//       formData.append("file", file);

//       axios
//         .post(CLOUDINARY_UPLOAD_URL, formData)
//         .then(response => {
//           console.log(">>>>>>>", response);

//           this.setState({
//             cloudinary_url: [
//               ...this.state.cloudinary_url,
//               response.data.secure_url
//             ]
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     });
//   };

//   nameHandler = e => {
//     // e.preventDefault();
//     this.setState({
//       fullName: e.target.value
//     });
//   };

//   talentHandler = e => {
//     this.setState({
//       talent: e.target.value
//     });
//   };

//   genreHandler = e => {
//     this.setState({
//       genre: e.target.value
//     });
//   };

//   influenceHandler = e => {
//     this.setState({
//       influence: e.target.value
//     });
//   };

//   picHandler = e => {
//     this.setState({
//       profile_pic: e.target.value
//     });
//   };

//   submit = e => {
//     const { user_id } = this.props.user.user;
//     const { fullName, talent, genre, influence, profile_pic } = this.state;
//     e.preventDefault();
//     axios.put(`/api/userprofile/${user_id}`, {
//       fullName,
//       talent,
//       genre,
//       influence,
//       profile_pic
//     });
//     this.setState({
//       fullName: "",
//       talent: "",
//       genre: "",
//       influence: "",
//       profile_pic: ""
//     });
//   };

//   render() {
//     // const { loggedInUser } = this.state;
//     const { user } = this.props.user;
//     // console.log(this.props);
//     // console.log(loggedInUser);
//     return (
//       <div className="profile-form">
//         {user ? (
//           <h2>Welcome, {user.username}! </h2>
//         ) : (
//           <h2>
//             Hello there! please <Link to="/login">log in</Link> to view your
//             profile!
//           </h2>
//         )}
//         <form>
//           <h4>We want to know you better!</h4>
//           <input
//             placeholder="what is your full name?"
//             onChange={e => this.nameHandler(e)}
//           />
//           <input
//             placeholder="what is your talent?"
//             onChange={e => this.talentHandler(e)}
//           />
//           <input
//             placeholder="what is your influence?"
//             onChange={e => this.influenceHandler(e)}
//           />
//           <input
//             placeholder="what is your genre?"
//             onChange={e => this.genreHandler(e)}
//           />
//           {/* <input
//             placeholder="your profile picture"
//             onChange={e => this.picHandler(e)}
//           /> */}
//           <Dropzone onDrop={this.onImageDrop} accept="image/*" multiple={false}>
//             {({ getRootProps, getInputProps }) => (
//               <section>
//                 <div {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   <p id="dropzone">
//                     <br />
//                     Click to select files, or drop your profile picture here
//                   </p>
//                 </div>
//               </section>
//             )}
//           </Dropzone>
//           <img id="cloud" alt="" src={this.state.cloudinary_url} />

//           <button onClick={e => this.submit(e)}>Submit</button>
//         </form>
//         {/* My Favorite StageRs */}
//         <div className="favorites" />
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return state;
// }

// const mapDispatchToProps = {};
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProfileForm);
