import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setUser } from "../../ducks/userReducer";

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
      <div>
        Give yourself a StageR Name!
        <br />
        <input placeholder="StageR Name" onChange={e => this.nameHandler(e)} />
        <br />
        <input placeholder="your email" onChange={e => this.emailHandler(e)} />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={e => this.passwordHandler(e)}
        />
        <br />
        <button type="submit" onClick={this.register}>
          <Link to="/userprofile">Save and continue</Link>
        </button>
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
