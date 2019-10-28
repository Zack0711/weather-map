import { createActions } from 'redux-actions';

import httpService from '../services/httpService'

export const START_FETCHING = 'START_FETCHING'
export const STOP_FETCHING = 'STOP_FETCHING'
const fetchData = async (dispatch, fetch) => {
  dispatch({ type: START_FETCHING })
  const rsp = await httpService.sendRequest(fetch.method, fetch.config)
  dispatch({ type: STOP_FETCHING })
  return rsp
}

export const UPDATE_SPECTRUM_LIST = 'UPDATE_SPECTRUM_LIST'
export const fetchSpectrumList = async (dispatch, getState) => {
  const rsp = await fetchData(dispatch, { method: 'getAllSpectrums', config:{}})
  dispatch({
    type: UPDATE_SPECTRUM_LIST,
    list: rsp.data,
  })
}

export const UPDATE_EDITED_SPECTRUM = 'UPDATE_EDITED_SPECTRUM'
export const fetchEditedSpectrumData = id => async (dispatch, getState) => {
  const rsp = await fetchData(dispatch, { method: 'getSpectrum', config:{id}})
  dispatch({
    type: UPDATE_EDITED_SPECTRUM,
    data: {
    	...rsp.data
    },
  })
}

export const OPEN_ADD_DIALOG = 'OPEN_ADD_DIALOG'
export const openAddDialog = () => ({ tpye: OPEN_ADD_DIALOG})
export const CLOSE_ADD_DIALOG = 'CLOSE_ADD_DIALOG'
export const closeAddDialog = () => ({ tpye: CLOSE_ADD_DIALOG})
