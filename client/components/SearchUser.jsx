import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { UserBoardsThunk } from '../redux';


class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.UserBoardsThunk(this.state.user);
    history.push(`/profile/${this.state.user}`);
    // e.target.value = '';
    this.setState({ user: '' });
  }
  render() {
    return (
      <form className="field is-grouped">
        <p className="control is-expanded">
          <input value={this.state.user} onChange={e => (this.setState({ user: e.target.value }))} className="input" type="text" placeholder="Find a User" />
        </p>
        <p className="control">
          <button onClick={this.handleClick} className="button is-info">
            Search
          </button>
        </p>
      </form>
    );
  }
}


const mapState = ({ user, boards }) => ({ user, boards });
const mapDispatch = { UserBoardsThunk };
export default connect(mapState, mapDispatch)(SearchUser);
