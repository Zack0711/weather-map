import { combineReducers } from 'redux';

import chart from './chart'
import spectrum from './spectrum'

import client from '../client'

const rootReducer = combineReducers({
  spectrum,
  chart,
//  apollo: client.reducer(),
})

export default rootReducer;