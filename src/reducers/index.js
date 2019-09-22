import { combineReducers } from 'redux';

import messages from './messagesReducer';
import user from './userReducer';
import usersList from './usersListReducer';
import chatRoom from './chatRoomReducer'
import posts from './postsReducer'

const rootReducer = combineReducers({
  posts,
})

export default rootReducer;