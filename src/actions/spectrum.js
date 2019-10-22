import { createActions } from 'redux-actions';

import httpService from '../services/httpService'

export const START_FETCHING = 'START_FETCHING'
export const STOP_FETCHING = 'STOP_FETCHING'

export const UPDATE_SPECTRUM_LIST = 'UPDATE_SPECTRUM_LIST'
export const fetchSpectrumList = async (dispatch, getState) => {

  const rsp = await httpService.sendRequest('getAllSpectrums', {})

  dispatch({
    type: UPDATE_SPECTRUM_LIST,
    list: rsp.data,
  })
}

export const UPDATE_EDITED_SPECTRUM = 'UPDATE_EDITED_SPECTRUM'

export const fetchEditedSpectrumData = id => async (dispatch, getState) => {
  dispatch({ type: START_FETCHING })

  const rsp = await httpService.sendRequest('getSpectrum', {id})

  dispatch({ type: STOP_FETCHING })
  dispatch({
    type: UPDATE_EDITED_SPECTRUM,
    data: {
    	...rsp.data
    },
  })
}

/*
httpService.sendRequest('getAllSpectrums', {}).then( data => {
  console.log(data)
})

httpService.sendRequest('getSpectrum', {id:'1237674649928597570'}).then( data => {
  console.log(data)
})

httpService.sendRequest('getSpectrumData', {id:'1237674649928597570'}).then( data => {
  console.log(data)
})

*/