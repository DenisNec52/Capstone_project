import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import { logout } from '../redux';
import MultiPinView from './MultiPinView';


const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const LaunchPad = props => (
  <div className="app container">
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {props.pins.length && props.pins.map(pin => (
        <MultiPinView key={pin._id} title={pin.description} id={pin._id} image={pin.image} />
        ))}
    </Masonry>
  </div>
);


const mapState = ({ user, pins }) => ({ user, pins });
const mapDispatch = { logout };
export default connect(mapState, mapDispatch)(LaunchPad);

LaunchPad.propTypes = {
  pins: PropTypes.array.isRequired,
};
