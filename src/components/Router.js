import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoaggedIn, userObj }) => {
  return (
    <Router>
      {isLoaggedIn && <Navigation />}
      <Switch>
        {isLoaggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
