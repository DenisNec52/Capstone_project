import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SavePinToBoard from './SavePinToBoard';
import BackButton from './BackButton';

class SinglePin extends Component {
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
    const pin = this.props.pins.filter(el => el._id == this.props.match.params.pinId);
    return (
      <div className="background">
        <BackButton />
        <div className="single-content-photo center container">
          {this.state.form ? <SavePinToBoard pin={pin.length && pin[0]._id} close={this.handleForm} /> :
          <Fragment />
          }
          <div>
            {this.props.user.username ?
              <div className="single-pin-button">
                <button onClick={this.handleForm} className="button is-pin-red">Save</button>
              </div> :
              <Fragment />
            }
            <div className="center">
              <p>{pin.length && pin[0].board}</p>
            </div>
            <div className="item-photo">
              <img alt="pin could not load" src={pin.length && pin[0].image} />
            </div>
            <div>
              <p className="desc">{pin.length && pin[0].description}</p>
              <p>Uploaded by <NavLink to={`/profile/${pin.length && pin[0].author.username}`}>{pin.length && pin[0].author.username}</NavLink> </p>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapState = ({ user, pins }) => ({ user, pins });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(SinglePin);

SinglePin.propTypes = {
  pins: PropTypes.array.isRequired,
};
