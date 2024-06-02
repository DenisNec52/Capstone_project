import axios from 'axios';
import history from '../history';
import { SingleBoardThunk } from './index';

/**
 * ACTION TYPES
 */
const GET_PINS = 'GET_PINS';
const GET_USER_PINS = 'GET_USER_PINS';
const REMOVE_PIN = 'REMOVE_PIN';
const ADD_PIN = 'ADD_PIN';

/**
 * INITIAL STATE
 */
// const intial = {
//   pins: [],
//   userPins: [],
// };

/**
 * ACTION CREATORS
 */
const getPins = pins => ({ type: GET_PINS, pins });
const getPinByUser = userPins => ({ type: GET_USER_PINS, userPins });
const addPin = pin => ({ type: ADD_PIN, pin });


/**
 * THUNK CREATORS
 */
export const pinsThunk = () =>
  dispatch =>
    axios.get('/api/pin')
      .then(res =>
        dispatch(getPins(res.data)))
      .catch(err => console.log(err));

export const addPinThunk = (photo, form, redirect) =>
  dispatch =>
    axios.post('/api/upload', photo)
      .then(res => res.data)
      .then((urlUpload) => {
        form.image = urlUpload.url;
        axios.post('/api/pin', form)
          .then((res) => {
            res.data.pin.author = { username: res.data.user };
            return dispatch(addPin(res.data.pin)); // dispatch this
          })
          .then(() => dispatch(SingleBoardThunk(redirect)))
          .then(() => history.push(`/board/${redirect}`));
      })
      .catch(err => console.log(err));

export const pinByUserThunk = username =>
  dispatch =>
    axios.get(`/api/pin/${username}`)
      .then(res =>
        dispatch(getPins(res.data)))
      .catch(err => console.log(err));

export default function (state = [], action) {
  switch (action.type) {
    case GET_PINS:
      return action.pins;
    case GET_USER_PINS:
      return action.userPins;
    case ADD_PIN:
      return [...state, action.pin];
    default:
      return state;
  }
}
