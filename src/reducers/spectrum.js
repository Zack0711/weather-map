import Immutable from 'immutable';
import union from 'lodash/union'
import { handleActions } from 'redux-actions';

const initState = {
  list: [],
  selected: null,
  isFetching: false,
}

const spectrumReducer = handleActions({
  START_FETCHING: state => ({
    ...state,
    isFetching: true,
  }),
  STOP_FETCHING: state => ({
    ...state,
    isFetching: true,
  }),
  UPDATE_SPECTRUM_LIST: (state, payload) => {
    return({
      ...state,
      list: payload.list,
    })    
  },
  UPDATE_EDITED_SPECTRUM: (state, payload) => {
    return({
      ...state,
      selected: {
        ...payload.data
      }
    })
  }
}, initState)

export default spectrumReducer