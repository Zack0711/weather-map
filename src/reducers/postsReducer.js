import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

const postState = {
  list: [],
  targetPost: null,
  isSinglePostModalOpen: false,
  isFetching: false,
}

const postsReducer = handleActions({
  UPDATE_POSTS: (state, payload) => ({
  	...state,
  	list: payload.posts
  }),
  SELECT_TARGET_POST: (state, payload) => ({
  	...state,
  	targetPost: payload.targetPost
  }),
  OPEN_SINGLE_POST_MODAL: state => ({
  	...state,
  	isSinglePostModalOpen: true
  }),
  CLOSE_SINGLE_POST_MODAL: state => ({
  	...state,
  	isSinglePostModalOpen: false
  }),
}, postState)

export default postsReducer