import { createActions } from 'redux-actions';

import {
  normalizingList,
} from '../utilities';

import httpService from '../services/httpService'

export const UPDATE_POSTS = 'UPDATE_POSTS'
export const SELECT_TARGET_POST = 'SELECT_TARGET_POST'
export const OPEN_SINGLE_POST_MODAL = 'OPEN_SINGLE_POST_MODAL'
export const CLOSE_SINGLE_POST_MODAL = 'CLOSE_SINGLE_POST_MODAL'

export const clostSinglePostModal = () => (dispatch, getState) => {
  dispatch({
  	type: CLOSE_SINGLE_POST_MODAL
  })
}

export const readSinglePost = targetPost => (dispatch, getState) => {
  dispatch({
  	type: SELECT_TARGET_POST,
  	targetPost
  })
  dispatch({type: OPEN_SINGLE_POST_MODAL})
}

export const getAllPosts = () => async(dispatch, getState) => {
  const allPosts = await httpService.sendRequest('getAllPost', {params: [{key:'_embed'}]});
  dispatch({
    type: UPDATE_POSTS,
    posts: allPosts
  })
}