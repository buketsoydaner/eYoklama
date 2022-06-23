import React, { Component } from "react";
import logo from "./images/tu-amblem.jpg";
import "./index.css";

class Navbar extends React.Component {
  state = {
  };

  logOut = () => {
    this.props.onLogOut();
  };

  render() {
    const { loggedUserName } = this.props;
    const { exit1 } = this.props;
    return (
      <div>
        <header>
          <h5 align="right">
            {exit1 ? (
              <i
                className="fa fa-user-o"
                aria-hidden="true"
                align="left"
                style={{ color: "white", cursor: "pointer" }}
                onClick={(event) => null}
              ></i>
            ) : (
              <i
                className="fa fa-user-o"
                aria-hidden="true"
                align="left"
                style={{ color: "white", cursor: "pointer" }}
                onClick={(event) => null}
              ></i>
            )}{" "}
            {loggedUserName}{" "}
            {exit1 ? (
              <i
                className="fa fa-sign-out"
                aria-hidden="true"
                style={{ color: "red", cursor: "pointer" }}
                onClick={this.logOut}
              ></i>
            ) : null}
          </h5>
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1>e-yoklama</h1>
          <p> Elektronik Yoklama Sistemi</p> */}
        </header>
      </div>
    );
  }
}
export default Navbar;
