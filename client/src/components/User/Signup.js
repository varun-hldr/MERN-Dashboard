import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as USER from "../api/apiActions";
import "../css/Login.css";

export default class Signup extends Component {
  state = {
    isRegistered: false,
    user: {},
    text: "",
  };

  register = async () => {
    const user = await USER.register(this.state.user);
    if (user.id) {
      this.setState({
        ...this.state,
        isRegistered: true,
      });
    } else {
      this.setState({
        ...this.state,
        text: user,
      });
    }
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      text: "",
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };
  render() {
    if (this.state.isRegistered) {
      return <Redirect to="/login" />;
    }
    return (
      <form className="login-form">
        <h2 className="text-center">Looks like you're new here!</h2>
        <span className="badge bg-dark mt-4">{this.state.text}</span>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            name="name"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="password"
            onChange={this.onChange}
          />
        </div>
        <div className="checkbox">
          <label>
            Existing User <Link to="/login">Login</Link>
          </label>
        </div>
        <button onClick={this.register} type="button" className="btn btn-dark">
          Signup
        </button>
      </form>
    );
  }
}
