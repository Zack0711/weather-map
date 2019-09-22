import Immutable from 'immutable';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

const usersListState = {
  shouldOpen: false,
  list: [],
  data: {},
}

const userById = handleActions({
  UPDATE_USER_BY_ID: (state, { payload }) => {
    const user = state.get(payload.id).toJS();
    Object.assign(user, payload.userState);
    return state.set(payload.id, Immutable.fromJS(user));
  },
  UPDATE_USERS_DATA: (state, { payload }) => {
    const newState = state.toJS();
    Object.assign(newState, payload.data);
    return Immutable.fromJS(newState);
  },
}, Immutable.fromJS({}));

const allUsers = handleActions({
  UPDATE_USERS_LIST: (state, { payload }) => Immutable.fromJS(payload.list),
  REMOVE_USER_FROM_LIST: (state, { payload }) => {
    const newList = state.toJS().filter( d => d !== payload.id);
    return Immutable.fromJS(newList);
  },
  APPEND_USERS_LIST: (state, { payload }) => {
    const newList = state.toJS().concat(payload.list);
    return Immutable.fromJS(newList);
  },
}, Immutable.fromJS([]));

const listToggle = handleActions({
  TOGGLE_USERS_LIST: (state, { payload }) => payload.shouldOpen,
}, false);

const usersListReducer = combineReducers({
  shouldOpen: listToggle,
  byId: userById,
  allIds: allUsers,
})

export default usersListReducer