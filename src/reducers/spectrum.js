import Immutable from 'immutable';
import union from 'lodash/union'
import { handleActions } from 'redux-actions';

const initState = {
  list: [],
  selected: {},
  isFetching: false,
  addDialogOpen: false,
  addSpectrumResult: {
    error: false,
    success: false,
    message: '',
  },
}

const spectrumReducer = handleActions({
  START_FETCHING: state => ({
    ...state,
    isFetching: true,
  }),
  STOP_FETCHING: state => ({
    ...state,
    isFetching: false,
  }),
  OPEN_ADD_DIALOG: state => ({
    ...state,
    addDialogOpen: true,
  }),
  CLOSE_ADD_DIALOG: state => ({
    ...state,
    addDialogOpen: false,
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
  },
  UPDATE_ADD_SPECTRUM_RESULT: (state, payload) => {
    return({
      ...state,
      addSpectrumResult: {
        ...state.addSpectrumResult,
        ...payload.result,
      }
    })
  },
}, initState)

export default spectrumReducer