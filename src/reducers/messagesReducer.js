import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const messageById = handleActions({
  UPDATE_MESSAGE_BY_ID: (state, { payload }) => {
    const message = state.get(payload.id).toJS();
    Object.assign(message, payload.msgState);
    return state.set(payload.id, Immutable.fromJS(message));
  },
  UPDATE_MESSAGES_DATA: (state, { payload }) => {
    const newState = state.toJS();
    Object.assign(newState, payload.data);
    return Immutable.fromJS(newState);
  },
}, Immutable.fromJS({}));

const allMessages = handleActions({
  UPDATE_MESSAGES_LIST: (state, { payload }) => Immutable.fromJS(payload.list),
  PREPEND_MESSAGES: (state, { payload }) => {
    const newList = payload.list.concat(state.toJS());
    return Immutable.fromJS(newList);
  },
  APPEND_MESSAGES: (state, { payload }) => {
    const newList = state.toJS().concat(payload.list);
    return Immutable.fromJS(newList);
  },
}, Immutable.fromJS([]));

const messagesReducer = combineReducers({
  byId: messageById,
  allIds: allMessages,
})

export default messagesReducer
