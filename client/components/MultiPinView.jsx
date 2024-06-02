import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SavePinToBoard from './SavePinToBoard';

class MultiPinView extends Component {
  constructor() {
    super();
    this.state = {
      form: false,
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(evt) {
    this.setState({ form: !this.state.form });
  }

  render() {
    return (
      <div className="item-photo">
        <div className="content-photo">
          {this.state.form ? <SavePinToBoard pin={this.props.id} close={this.handleForm} /> :
            <Fragment />}
          <div className="pin-header">
            <p>{this.props.title.length > 10 ? `${this.props.title.slice(0, 10)  }...` : this.props.title}</p>
            {this.props.user.username ? <button onClick={this.handleForm} className="button is-pin-red">Save</button> : <Fragment />}
          </div>
          <NavLink to={`/pin/${this.props.id}`}>
            <img className="photothumb" alt="pin could not load" src={this.props.image} />
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = {};

export default connect(mapState, mapDispatch)(MultiPinView);
