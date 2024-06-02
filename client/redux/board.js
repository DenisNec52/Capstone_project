import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_BOARD_ITEMS = 'GET_BOARD_ITEMS';
const GET_USER_BOARD = 'GET_USER_BOARD';


/**
 * ACTION CREATORS
 */

const getBoardsItem = boardsPins => ({ type: GET_BOARD_ITEMS, boardsPins });
const getUserBoard = boards => ({ type: GET_USER_BOARD, boards });


const intialState = {
  boardPins: {},
  userBoards: {},
};
/**
 * THUNK CREATORS
 */
export const SingleBoardThunk = id =>
  dispatch =>
    axios.get(`/api/board/pin/${id}`)
      .then(res =>
        dispatch(getBoardsItem(res.data)))
      .catch(err => console.log(err));

export const UserBoardsThunk = username =>
  dispatch =>
    axios.get(`/api/board/${username}`)
      .then((res) => {
        dispatch(getUserBoard(res.data));
      })
      .catch((err) => {
        console.log(err);
        history.push('/404');
      });

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_BOARD_ITEMS:
      return Object.assign({}, state, { boardPins: action.boardsPins });
    case GET_USER_BOARD:
      return Object.assign({}, state, { userBoards: action.boards });
    default:
      return state;
  }
}
