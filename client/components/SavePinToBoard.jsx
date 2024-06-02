import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios'; // not changing state
import history from '../history';
import { SingleBoardThunk } from '../redux';


class SavePinToBoard extends Component {
  constructor() {
    super();
    this.state = {
      board: '',
      boardIdForRedirect: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.put(`/api/pin/${this.props.pin}`, { board: this.state.board })
      .then((res) => {
        console.log(res.data);
      })
      .then(() => this.props.SingleBoardThunk(this.state.boardIdForRedirect))
      .then(() => history.push(`/board/${this.state.boardIdForRedirect}`))
      .then(() => this.props.close());
  }

  render() {
    const boards = this.props.user;
    return (
      <div className="form-save">
        <div className="control">
          <label className="label">Choose Board:  </label>
          <div className="select">
            <select onChange={e => (this.setState({ board: boards.boards[e.target.value].title, boardIdForRedirect: boards.boards[e.target.value]._id }))}>
              <option disabled selected="true">Your Boards</option>
              {boards.name && boards.boards.map((board, idx) => (
                <option key={board.title} value={idx}>{board.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={(e) => {
          e.preventDefault();
          this.props.close();
        }}
        >Close
        </button>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { SingleBoardThunk };
export default connect(mapState, mapDispatch)(SavePinToBoard);

