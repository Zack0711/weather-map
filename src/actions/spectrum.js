import { createActions } from 'redux-actions';

import httpService from '../services/httpService'

import {
  csvParse
} from '../utilities/csv'

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
  dispatch({
    type: UPDATE_EDITED_SPECTRUM,
    data: null,
  })
  const rsp = await fetchData(dispatch, { method: 'getSpectrum', config:{id}})
  const spectrum = {
    id: rsp.data.id,
    subclass: rsp.data.subclass,
    csvUrl: rsp.data.csv_url,
    reference: rsp.data.reference,
    data: csvParse(rsp.data.data),
  }
  console.log(spectrum)
  //console.log(JSON.parse(rsp.data.data))
  //rsp.data.data = JSON.parse(rsp.data.data)
  dispatch({
    type: UPDATE_EDITED_SPECTRUM,
    data: {
    	...spectrum
    },
  })
}

export const OPEN_ADD_DIALOG = 'OPEN_ADD_DIALOG'
export const openAddDialog = () => ({ type: OPEN_ADD_DIALOG})
export const CLOSE_ADD_DIALOG = 'CLOSE_ADD_DIALOG'
export const closeAddDialog = () => ({ type: CLOSE_ADD_DIALOG})

export const UPDATE_ADD_SPECTRUM_RESULT = 'UPDATE_ADD_SPECTRUM_RESULT'

export const addSpectrum = id => async (dispatch, getState) => {

  if(parseInt(id)){
    const rsp = await fetchData(dispatch, { method: 'addSpectrum', config:{ data: {id}} })
    if(rsp.message){
      dispatch({
        type: UPDATE_ADD_SPECTRUM_RESULT,
        result: {
          error: true,
          success: false,
          message: rsp.message,
        },
      })
    }else{
      dispatch({
        type: UPDATE_ADD_SPECTRUM_RESULT,
        result: {
          error: false,
          success: true,
          message: '',
        },
      })
    }  
  } else {
    dispatch({
      type: UPDATE_ADD_SPECTRUM_RESULT,
      result: {
        error: true,
        success: false,
        message: '請輸入數字',
      },
    })
  }
}
