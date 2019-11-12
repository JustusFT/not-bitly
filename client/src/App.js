import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/auth/self")
      .then(response => response.json())
      .then(json => {
        setUser(json.user);
        setLoaded(true);
      });
  }, []);

  return loaded ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route exact path="/dashboard">
          {!user ? <Redirect to="/" /> : <Dashboard />}
        </Route>
        <Route exact path="/sign-in">
          {user ? <Redirect to="/dashboard" /> : <SignIn />}
        </Route>
        <Route exact path="/sign-up">
          {user ? <Redirect to="/dashboard" /> : <SignUp />}
        </Route>
      </Switch>
    </BrowserRouter>
  ) : (
    "Loading app..."
  );
}
