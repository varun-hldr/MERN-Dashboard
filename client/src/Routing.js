import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Layout from "./components";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as USER from "./components/api/apiActions";

class Routing extends Component {
  // componentDidMount() {
  //   if (!this.props.auth.isAuth) {
  //     USER.getSessionUser(this.props.auth.token);
  //   }
  // }
  render() {
    return (
      <div className="container">
        <Router>
          <Layout.Navbar />
          <Switch>
            <Route exact path="/" component={Layout.Home} />
            <Route path="/adduser" component={Layout.AddUser} />
            <Route path="/dashboard" component={Layout.Dashboard} />
            <Route path="/login" component={Layout.Login} />
            <Route path="/signup" component={Layout.Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Routing);
