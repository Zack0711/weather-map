import { createActions } from 'redux-actions';

import {
  normalizingList,
} from '../utilities/normalize';

import getCSVData from '../services/getCSVData'

const fetchCSVData = async d => {
  const data =  await getCSVData(d.url);
  return {
    ...d,
    data,
  }
}

const spectrumData = [
  {
    id: '1237674649928597570',
    url: './csv_data/csvSpectrum_1237674649928597570.csv',
    subClass: 'K1',
    reference: 'http://skyserver.sdss.org/dr12/en/tools/quicklook/summary.aspx?id=1237674649928597570',
  },
  {
    id: '1237674649928597563',
    url: './csv_data/csvSpectrum_1237674649928597563.csv',
    subClass: 'F5',
    reference: 'http://skyserver.sdss.org/dr12/en/tools/quicklook/summary.aspx?id=1237674649928597563',    
  },
  {
    id: '1237674649928532061',
    url: './csv_data/csvSpectrum_1237674649928532061.csv',
    subClass: 'K3',
    reference: 'http://skyserver.sdss.org/dr12/en/tools/quicklook/Summary.aspx?id=1237674649928532061',
  },
  {
    id: '1237674649928532213',
    url: './csv_data/csvSpectrum_1237674649928532213.csv',
    subClass: 'K1',
    reference: 'http://skyserver.sdss.org/dr12/en/tools/quicklook/Summary.aspx?id=1237674649928532213',
  },
  {
    id: '1237648720693690487',
    url: './csv_data/csvSpectrum_1237648720693690487.csv',
    subClass: 'K1',
    reference: 'http://skyserver.sdss.org/dr12/en/tools/quicklook/Summary.aspx?id=1237648720693690487',
  },
]

const csvList = [
  './csv_data/csvSpectrum_1237674649928597570.csv',
  './csv_data/csvSpectrum_1237674649928597563.csv',
  './csv_data/csvSpectrum_1237674649928532061.csv',
  './csv_data/csvSpectrum_1237674649928532213.csv',
]

export const SELECT_SPECTRUM = 'SELECT_SPECTRUM'
export const selectSpectrum = () => {
  const index = Math.floor(Math.random()*spectrumData.length)
  const target = spectrumData[index].id

  return({
    type: SELECT_SPECTRUM,
    target,
  })
}

export const UPDATE_CHART_DATA = 'UPDATE_CHART_DATA'
export const getChartData = () => async (dispatch, getState) => {

  const listData = await Promise.all( spectrumData.map( d => fetchCSVData(d) ) )
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
