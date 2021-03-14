import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as USER from "../api/apiActions";
import "../css/Login.css";

class Login extends Component {
  state = {
    user: {},
    text: "",
  };

  login = async () => {
    const TOKEN = await USER.login(this.state.user);
    if (TOKEN.length > 100) {
      this.props.dispatch({ type: "AUTH_LOGIN", payload: { TOKEN } });
    } else {
      this.setState({
        ...this.state,
        text: TOKEN,
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
    if (this.props.auth.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <form className="login-form">
        <h2 className="text-center">Login to your Account</h2>
        <span className="badge bg-dark mt-4">{this.state.text}</span>
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
            New User <Link to="/signup">Create Account</Link>
          </label>
        </div>
        <button onClick={this.login} type="button" className="btn btn-dark">
          Login
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Login);
