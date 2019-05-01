import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../ducks/userReducer";
import "../Register/Register.scss";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userame: "",
      email: "",
      password: "",
      loggedInUser: {}
    };
  }

  register = () => {
    const loginPayload = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginPayload);
    axios.post("/auth/register", loginPayload).then(res => {
      console.log("logged in user:", res.data);
      //   this.setState({
      //     loggedInUser: res.data
      //   });
      this.props.setUser(res.data);
    });
  };

  nameHandler = e => {
    this.setState({
      username: e.target.value
    });
  };

  emailHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  passwordHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className="outer-register">
        <div className="inner-register">
          <h1>Register</h1>
          <br />
          <input
            placeholder="your stager Name..."
            onChange={e => this.nameHandler(e)}
          />
          <br />
          <input
            placeholder="your email..."
            onChange={e => this.emailHandler(e)}
          />
          <br />
          <input
            type="password"
            placeholder="your password..."
            onChange={e => this.passwordHandler(e)}
          />
          <br />
          <div className="btns">
            <button type="submit" onClick={this.register}>
              <Link to="/profileform">complete your profile now?</Link>
            </button>
            <button>
              <Link to="/dashborad">go to dashboard</Link>
            </button>
          </div>
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
)(Register);
