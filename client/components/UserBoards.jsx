import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BoardItem from './BoardItem';
import NewBoardForm from './NewBoardForm';
import { UserBoardsThunk } from '../redux';

class Boards extends Component {
  constructor() {
    super();
    this.state = {
      form: false,
    };
    this.handleForm = this.handleForm.bind(this);
  }
  componentDidMount() {
    // fetch pins
    this.props.UserBoardsThunk(this.props.match.params.user);
  }

  handleForm(evt) {
    this.setState({ form: !this.state.form });
  }
  render() {
    const boardOwner = this.props.boards.userBoards.user;
    const { boards } = this.props.boards.userBoards;
    const loggedUser = this.props.user.username;
    return (
      <div className="container">
        <h1 className="title">{boardOwner}'s Boards</h1>
        <div className="flex-container">
          {this.state.form ? <NewBoardForm close={this.handleForm} /> :
            <Fragment />}
          {boardOwner === loggedUser ? <div onClick={this.handleForm} className="board">
            <div className="board-button">
              <img src="/assets/add.svg" alt="add board" />
            </div>
            <div className="center board-title">
              <p>Add Board</p>
            </div>
          </div> : <Fragment />}
          {boardOwner && boards.map(board => (
            <BoardItem id={board._id} title={board.title} />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = ({ user, boards }) => ({ user, boards });
const mapDispatch = { UserBoardsThunk };
export default connect(mapState, mapDispatch)(Boards);
