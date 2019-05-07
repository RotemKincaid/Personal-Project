import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../Login/Login.scss";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      loggedInUser: {}
    };
    this.login = this.login.bind(this);
  }

  async login() {
    let { userName, password } = this.state;
    axios.post("auth/login", { userName, password }).then(res => {
      this.props.setUser(res.data);
      //   this.setState({
      //     loggedInUSer: res.data,
      //     username: "",
      //     password
      //   });
    });
  }

  logout = () => {
    axios.get("/auth/logout").then(() => {
      this.props.setUser(null);
    });
  };

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log("CHECK THIS OUT", this.props);
    let { userName, password } = this.state;
    const { username } = this.props.user.user;
    return (
      <div className="login-outer">
        <div className="login-inner">
          <h2>Welcome back!</h2>
          <h5>Please log in with your credentials</h5>

          <input
            placeholder="stagername"
            name="userName"
            value={userName}
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />

          <input
            placeholder="password"
            name="password"
            type="password"
            value={password}
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />

          {/* {username ? (
            <button onClick={() => this.logout()}>Logout</button>
          ) : ( */}
          <button className="login" onClick={() => this.login()}>
            <Link to="/dashboard">Login</Link>
          </button>
          <button className="register">
            <Link to="/register">
              Don't have an account yet? Register here!
            </Link>
          </button>
          {/* )} */}
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
)(Login);
