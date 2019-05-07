import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo2 from "../Welcome/stagerlogo copy.png";
import "../Welcome/Welcome.scss";

class Welcome extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="inner-container">
          <h1>Welcome!</h1>
          <h4>
            <p>
              This is your place to express yourself, your originality, and your
              many colors! Join our community of stagers and audiers, encourage
              each other, share your art, music, or videos, and most
              importantly- be kind!
            </p>
          </h4>
          <div>
            <button className="login">
              <Link to="/login">Login</Link>
            </button>
            <button className="register">
              <Link to="/register">Register</Link>
            </button>
            <br />
            <div className="link-btn">
              <button className="to-dash">
                <Link to="/dashboard">See what's going on!</Link>
              </button>
            </div>
          </div>
        </div>
        <div>{/* <img className="logo2" src={logo2} /> */}</div>
      </div>
    );
  }
}

export default Welcome;
