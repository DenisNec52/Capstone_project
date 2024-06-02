import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { addPinThunk, SingleBoardThunk } from '../redux';

class AddPinForm extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
      board: '',
      boardIdForRedirect: '',
      description: '',
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  handleDrop(droppedFile) {
    this.setState({ file: droppedFile[0] });
  }

  handleChange(evt) {
    this.setState({ description: evt.target.value });
  }

  handleSelect(evt) {
    const boards = this.props.user; // need two handles or else got error but would still worked
    this.setState({ board: boards.boards[evt.target.value].title, boardIdForRedirect: boards.boards[evt.target.value]._id });
  }

  handleSumbit() {
    const file = new FormData();
    file.append('photo', this.state.file);
    const form = {
      board: this.state.board,
      description: this.state.description,
    };

    this.props.addPinThunk(file, form, this.state.boardIdForRedirect);
    this.props.close();
  }
  render() {
    const { file } = this.state;
    const boards = this.props.user;
    return (
      <div className="modal is-active">
        <div className="modal-background">
          <div className="form-pin">
            <div className="form-pin-title center">
              <p>Create Pin</p>
            </div>
            <hr />
            <div className="flex-container">
              <Dropzone className="dropzone" onDrop={this.handleDrop}>
                {file.type ?
                  <div className="title">
                    Photo Ready for Upload!
                <div className="tick center">
                  <img src="/assets/tick.svg" alt="check" />
                </div>
                  </div> :
                  <div className="title">Drop in Photo or Click to Upload</div>}
              </Dropzone>
              <div className="form-pin-input">
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea onChange={this.handleChange} name="description" className="textarea" placeholder="Description of your pin" />
                  </div>
                  <div className="control">
                    <label className="label">Choose Board:  </label>
                    <div className="select">
                      <select onChange={this.handleSelect}>
                        <option disabled selected="true">Your Boards</option>
                        {boards.name && boards.boards.map((board, idx) => (
                          <option key={board.title} value={idx}>{board.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-pin-input-button">
                  <div>
                    <button onClick={this.handleSumbit} className="button is-primary">Submit</button>
                  </div>
                  <div>
                    <button onClick={() => (this.props.close())} className="button is-danger">Go Back</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = { addPinThunk, SingleBoardThunk };
export default connect(mapState, mapDispatch)(AddPinForm);
