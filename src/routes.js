import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import Register from "./Components/Register/Register";
import ProfileForm from "./Components/ProfileForm/ProfileForm";

export default (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profileform" component={ProfileForm} />
    <Route path="/userprofile" component={UserProfile} />
  </Switch>
);
