import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../redux';


class AuthForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = this.props.match.path.slice(1);
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    const username = evt.target.username && evt.target.username.value || '';
    const name = evt.target.name && evt.target.name.value || '';
    const formData = {
      email, password, username, name,
    };
    this.props.auth(formData, formName);
  }

  render() {
    const formType = this.props.match.path.slice(1);
    let message;
    formType === 'signup' ? message = 'Sign Up' : message = 'Log In';
    return (
      <div className="container">
        <h1 className="title">{message}</h1>
        <form onSubmit={this.handleSubmit} name={formType}>
          {formType === 'signup' ? <Fragment><div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" name="name" type="text" placeholder="John Doe" />
            </div>
          </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input name="username" className="input" type="text" />
              </div>
            </div>
          </Fragment> :
            <Fragment />}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" name="email" placeholder="example@hireBrian.com" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" />
            </div>
          </div>
          <button className="button is-link">{formType === 'signup' ? 'Sign Up' : 'Log In'}</button>
        </form>
      </div>
    );
  }
}


const mapDispatch = { auth };
export default connect(null, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  auth: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
