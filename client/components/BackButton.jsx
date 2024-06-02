import React from 'react';
import { NavLink } from 'react-router-dom';
import history from '../history';

const BackButton = props => (
  <div onClick={()=>(history.goBack())} className="back-button">
    <img src="/assets/back.svg" alt="back broken" />
    <span> Go Back</span>
  </div>
);

export default BackButton;
