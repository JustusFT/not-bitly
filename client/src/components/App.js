import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import Home from './home/Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

export const UserContext = React.createContext(null);

export default function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/auth/self')
      .then(response => response.json())
      .then(json => {
        setUser(json.user);
        setLoaded(true);
      });
  }, []);

  return loaded ? (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/a/dashboard" /> : <Home />}
          </Route>
          <Route path="/a/dashboard">
            {!user ? <Redirect to="/" /> : <Dashboard />}
          </Route>
          <Route exact path="/a/sign-in">
            {user ? <Redirect to="/a/dashboard" /> : <SignIn />}
          </Route>
          <Route exact path="/a/sign-up">
            {user ? <Redirect to="/a/dashboard" /> : <SignUp />}
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  ) : (
    'Loading app...'
  );
}
