import React from 'react';
import { NavLink } from 'react-router-dom';

const BoardItem = props => (
  <div className="board">
    <NavLink to={`/board/${props.id}`}>
    <div className="board-button">
      <img src="/assets/gallery.svg" alt="image of images dawg" />
    </div>
    <div className="center board-title">
      <p>{props.title}</p>
    </div>
    </NavLink>
  </div>
);

export default BoardItem;
