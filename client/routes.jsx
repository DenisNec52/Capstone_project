import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserNotFound, PinsInBoard, LaunchPad, AuthForm, NavBar, SinglePin, Boards } from './components';
import history from './history';
import { me, pinsThunk } from './redux';

class Routes extends Component {
  componentDidMount() {
    this.props.me(); // Gets current user on application load
    this.props.pinsThunk();
  }
  render() {
    return (
      <Router history={history}>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/profile/:user" component={Boards} />
            <Route exact path="/login" component={AuthForm} />
            <Route exact path="/signup" component={AuthForm} />
            <Route path="/pin/:pinId" component={SinglePin} />
            <Route path="/board/:boardId" component={PinsInBoard} />
            <Route path="/404" component={UserNotFound} />
            <Route component={LaunchPad} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapDispatch = { me, pinsThunk };
export default connect(null, mapDispatch)(Routes);

Routes.propTypes = {
  me: PropTypes.func.isRequired,
  pinsThunk: PropTypes.func.isRequired,
};
