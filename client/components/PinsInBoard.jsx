import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import { SingleBoardThunk } from '../redux';
import MultiPinView from './MultiPinView';
import AddPinForm from './AddPinForm';

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};


class PinsInBoard extends Component {
  constructor() {
    super();
    this.state = {
      form: false,
    };
    this.handleForm = this.handleForm.bind(this);
  }
  componentDidMount() {
    this.props.SingleBoardThunk(this.props.match.params.boardId);
  }

  handleForm() {
    this.setState({ form: !this.state.form });
  }

  render() {
    const pins = this.props.boards.boardPins.pins;
    const board = this.props.boards;
    return (
      <div className="app container">
        <h1 className="title">{board.boardPins.title && board.boardPins.title.toUpperCase()}</h1>
        <h2 className="subtitle">{board.boardPins.title && board.boardPins.description}</h2>
        {/* {this.props.user.username ?
                  <div key={'00'} onClick={this.handleForm} className="new-pin">
          <img src="/assets/add.svg" alt="add pin" />
        </div> : null} */}
        {this.state.form ? <AddPinForm close={this.handleForm} /> :
          null}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {board.boardPins.title && pins.map((pin, idx) => {
            if (idx === 0) {
              return (
                this.props.user.username ?
                  <div key={'00'} onClick={this.handleForm} className="new-pin">
                    <img src="/assets/add.svg" alt="add pin" />
                  </div> : null
              );
            }
           return (<MultiPinView key={pin._id} id={pin._id} title={pin.description} image={pin.image} />);
          })}
        </Masonry>
      </div>
    );
  }
}


const mapState = ({ user, boards }) => ({ user, boards });
const mapDispatch = { SingleBoardThunk };
export default connect(mapState, mapDispatch)(PinsInBoard);
