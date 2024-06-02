import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CreateBoardThunk } from '../redux';

class NewBoardForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
    };
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background">
          <div className="field form-board">
            <p>Create Board</p>
            <label className="label">Board Title</label>
            <div className="control">
              <input onChange={e => (this.setState({ title: e.target.value }))} className="input" name="title" type="text" placeholder="ex Doge Party" />
            </div>
            <label className="label">Description</label>
            <div className="control">
              <input onChange={e => (this.setState({ description: e.target.value }))} className="input" name="escription" type="text" placeholder="ex Hire Brian" />
            </div>
            <div className="board-buttons">
              <div>
                <button onClick={() => (this.props.close())} className="button is-danger">Close</button>
              </div>
              <div>
                <button
                  onClick={((e) => {
                    e.preventDefault();
                    this.props.CreateBoardThunk(this.state);
                    this.props.close();
                  })}
                  className="button is-primary"
                >Create
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = { CreateBoardThunk };
export default connect(mapState, mapDispatch)(NewBoardForm);
