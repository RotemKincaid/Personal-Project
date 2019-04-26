import React, { Component } from "react";
import logo from "../Header/another-logo.png";
// import routes from "../../routes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";

import "../Header/Header.scss";
import axios from "axios";

class Header extends Component {
  componentDidMount() {
    axios.get("/auth/usersession").then(res => {
      this.props.setUser(res.data);
    });
  }
  render() {
    return (
      <div className="header-container">
        <img src={logo} alt="" />
        <h1>StageR</h1>
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
