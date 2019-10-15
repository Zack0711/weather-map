import { createActions } from 'redux-actions';

import {
  normalizingList,
} from '../utilities/normalize';

import getCSVData from '../services/getCSVData'

const fetchCSVData = async url => {
  const data =  await getCSVData(url);
  return {
    id: url,
    data,
  }
}

const csvList = [
  './csv_data/csvSpectrum_1237674649928597570.csv',
  './csv_data/csvSpectrum_1237674649928597563.csv',
  './csv_data/csvSpectrum_1237674649928532061.csv',
  './csv_data/csvSpectrum_1237674649928532213.csv',
]

export const SELECT_SPECTRUM = 'SELECT_SPECTRUM'
export const selectSpectrum = (target = csvList[0]) => ({
  type: SELECT_SPECTRUM,
  target,
})

export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA'
export const getChartData = () => async (dispatch, getState) => {

  const listData = await Promise.all( csvList.map( d => fetchCSVData(d) ) )
  const {
    data,
    list
  } = normalizingList(listData)

  dispatch({
  	type: UPDATE_CHART_DATA,
    list,
    data,
  })

  dispatch(selectSpectrum())
}
