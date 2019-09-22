import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const userState = {
  name: '',
  id: '',
  isLogin: false,
  isFetching: false,
  isError: false,
}

const userReducer = handleActions({
	LOGIN_START: state => state.set('isFetching', true),
	LOGIN_FAIL: state => state.set('isFetching', false).set('isError', true),
  UPDATE_LOGIN_STATUS: (state, { payload }) => {
  	const newState = payload.status;
  	newState.isFetching = false;
  	newState.isError = false;  	
  	return Immutable.fromJS(newState)
  },
}, Immutable.fromJS(userState))

export default userReducer