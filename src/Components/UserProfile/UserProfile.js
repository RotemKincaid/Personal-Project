import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loggedInUser: "",
      fullName: "",
      talent: "",
      genre: "",
      influence: "",
      profile_pic: ""
    };
  }

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
      profile_pic: e.target.value
    });
  };

  submit = e => {
    const { user_id } = this.props.user;
    const { fullName, talent, genre, influence, profile_pic } = this.state;
    e.preventDefault();
    axios.put(`/api/userprofile/${user_id}`, {
      fullName,
      talent,
      genre,
      influence,
      profile_pic
    });
  };

  render() {
    // const { loggedInUser } = this.state;
    const { user } = this.props;
    // console.log(this.props);
    // console.log(loggedInUser);
    return (
      <div>
        This is your profile
        {user ? (
          <h2>Welcome back, {user.username}! </h2>
        ) : (
          <h2>
            Hello there! please <Link to="/login">log in</Link> to view your
            profile!
          </h2>
        )}
        <h4>your StageR info - please fill out!</h4>
        <form>
          <input
            placeholder="what is your full name?"
            onChange={e => this.nameHandler(e)}
          />
          <input
            placeholder="what is your talent?"
            onChange={e => this.talentHandler(e)}
          />
          <input
            placeholder="what is your influence?"
            onChange={e => this.influenceHandler(e)}
          />
          <input
            placeholder="what is your genre?"
            onChange={e => this.genreHandler(e)}
          />
          <input
            placeholder="your profile picture"
            onChange={e => this.picHandler(e)}
          />

          <button onClick={e => this.submit(e)}>Submit</button>
        </form>
        My Favorite StageRs
        <div className="favorites" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
