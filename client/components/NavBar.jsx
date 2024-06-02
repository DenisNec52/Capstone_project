import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SeachUser from './SearchUser';
import { logout } from '../redux';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      hamburger: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.hamburger === 'is-active') {
      this.setState({ hamburger: '' });
      return;
    }
    this.setState({ hamburger: 'is-active' });
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/"><img className="logo navbar-item" src="/assets/logo.svg" alt="logo" /></NavLink>
          <SeachUser />
          <button onClick={this.handleClick} className="button is-black navbar-burger">
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`navbar-menu ${this.state.hamburger}`}>
          <NavLink className="navbar-item" to="/">Home</NavLink>
          {this.props.user.username ?
            <Fragment>
              <NavLink to={`/profile/${this.props.user.username}`} className="navbar-item">
                {this.props.user.username}
              </NavLink>
              <a onClick={() => (this.props.logout())} className="navbar-item" href="#">
                Sign Out
              </a>
            </Fragment>
            :
            <Fragment>
              <NavLink to="/login" className="navbar-item">
                Log In
              </NavLink>
              <NavLink to="/signup" className="navbar-item">
                Sign Up
              </NavLink>
            </Fragment>
          }
        </div>
      </nav>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { logout };
export default connect(mapState, mapDispatch)(NavBar);
