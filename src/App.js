import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import about from "./pages/About";
import Navbar from "./Navbar";
import home from "./pages/Home";
import checkIn from "./pages/CheckIn";
import checkOut from "./pages/CheckOut";
import listAll from "./pages/listAll";
import Login from "./pages/Login";
import useToken from "./useToken";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/checkIn" component={checkIn} />
          <Route path="/checkOut" component={checkOut} />
          <Route path="/listAll" component={listAll} />
          <Route path="/about" component={about} />
          <Route path="/" component={home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
