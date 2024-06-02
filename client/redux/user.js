import axios from 'axios';
import history from '../history';
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const NEW_BOARD = 'NEW_BOARD';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const newBoard = user => ({ type: NEW_BOARD, user });

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err));

export const CreateBoardThunk = board =>
  dispatch =>
    axios.post('/api/board/', board)
      .then((res) => {
        const redirect = res.data.boards[res.data.boards.length-1]._id
        dispatch(newBoard(res.data));
        history.push(`/board/${redirect}`);
      })
      .catch(err => console.log(err));

export const auth = (formData, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, formData)
      .then((res) => {
        dispatch(getUser(res.data));
      })
      .then(() => {
        history.push('/');
      })
      .catch(error =>
        dispatch(getUser({ error })));

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(() => {
        dispatch(removeUser());
        history.push('/');
      })
      .catch(err => console.log(err));


export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case NEW_BOARD:
      return action.user;
    default:
      return state;
  }
}
