import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
//import {  } from "./Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Login/>
          <br />
          
        </div>
      </Router>
    );
  }
}
export default App;
