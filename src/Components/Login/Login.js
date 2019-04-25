import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedInUser: {}
    };
    this.login = this.login.bind(this);
  }

  async login() {
    let { username, password } = this.state;
    axios.post("auth/login", { username, password }).then(res => {
      this.props.setUser(res.data);
      //   this.setState({
      //     loggedInUSer: res.data,
      //     username: "",
      //     password
      //   });
    });
  }

  changeHandler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(this.props);
    let { loggedInUser, username, password } = this.state;
    return (
      <div>
        <h2>Welcome back!</h2>
        <h5>Please log in with your credentials</h5>
        <div>
          <input
            placeholder="stagername"
            name="username"
            value={username}
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />

          <input
            placeholder="password"
            name="password"
            type="password"
            value={password}
            onChange={e => this.changeHandler(e.target.name, e.target.value)}
          />

          {loggedInUser.username ? (
            <button>Logout</button>
          ) : (
            <button onClick={() => this.login()}>
              <Link to="/userprofile">Login</Link>
            </button>
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
)(Login);
