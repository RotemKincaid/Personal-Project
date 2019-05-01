import React, { Component } from "react";
import logo from "../Header/newest-logo.png";
// import routes from "../../routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";

import "../Header/Header.scss";
import axios from "axios";

class Header extends Component {
  // constructor(){
  //   super()

  //   this.state = {
  //     is
  //   }
  // }
  componentDidMount() {
    axios.get("/auth/usersession").then(res => {
      // this.props.setUser(res.data);
      axios.get(`/user/profile/${res.data.user_id}`).then(user => {
        console.log("HEYYYYYY", user.data[0]);
        this.props.setUser(user.data[0]);
      });
      console.log(">>>>>", res.data);
    });
  }
  render() {
    const { user } = this.props;
    console.log("NEW LABEL", this.props.user.user);
    return (
      <div className="header-container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <h1>{user.username}</h1>

        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/userprofile">MyStageR</Link>
            </li>

            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>
        <div className="btns">
          <button className="login-btn">
            <Link to="/login">Login</Link>
          </button>
          <button className="register-btn">
            <Link to="/register">Register</Link>
          </button>
        </div>
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
)(Header);
