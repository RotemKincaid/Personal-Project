import React, { Component } from "react";
import logo from "../Header/stagerlogo.png";
// import routes from "../../routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import burgerMenu from "../Header/menu3.png";

import "../Header/Header.scss";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      toggle: false
    };
  }

  toggleSideBar = () => {
    this.setState(prevState => {
      console.log(this.state.toggle);
      return {
        toggle: !prevState.toggle
      };
    });
  };

  logout = () => {
    axios.get("/auth/logout").then(() => {
      this.props.setUser({});
    });
  };

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
    const { username } = this.props.user.user;
    console.log("NEW LABEL", this.props.user);
    return (
      <div className="header-container">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        {username ? (
          <h1 className="logged-in">{username} is logged in!</h1>
        ) : null}

        <div className="button-container">
          <button
            className="toggle-sidebar"
            onClick={() => this.toggleSideBar()}
          >
            {/* I am the button! */}
            {!this.state.toggle ? (
              <img className="menu" src={burgerMenu} />
            ) : (
              <img className="menu" src={burgerMenu} />
            )}
          </button>
        </div>

        <nav className={this.state.toggle ? "show" : null}>
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
          {username ? (
            <button className="logout-btn" onClick={() => this.logout()}>
              <Link to="/login">Logout</Link>
            </button>
          ) : (
            <div className="btns">
              {" "}
              <button className="login-btn">
                <Link to="/login">Login</Link>
              </button>
              <button className="register-btn">
                <Link to="/register">Register</Link>
              </button>
            </div>
          )}
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
