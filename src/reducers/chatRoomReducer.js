import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const chatRoomState = {
  roomId: '',
  historyFetchDate: 0,
  isFetching: false,
  isConnected: false,
  isError: false,
}

const chatRoomReducer = handleActions({
  CONNECT_START: state => state.set('isFetching', true),
  CONNECT_FAIL: state => state.set('isConnected', false).set('isFetching', false).set('isError', true),
  CONNECT_SUCCESS: state => state.set('isConnected', true).set('isFetching', false).set('isError', true),
}, Immutable.fromJS(chatRoomState))

export default chatRoomReducer