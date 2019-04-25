import React, { Component } from "react";
import routes from "./routes";
import { withRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
// import Feed from "./Components/Feed/Feed";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Welcome from "./Components/Welcome/Welcome";
// import Login from "./Components/Login/Login";

import "./App.css";

class App extends Component {
  render() {
    console.log(this.props.location.pathname);
    return (
      <div className="App">
        {this.props.location.pathname === "/" ? <div /> : <Header />}
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
