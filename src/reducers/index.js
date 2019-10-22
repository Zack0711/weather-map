import { combineReducers } from 'redux';

import chart from './chart'
import spectrum from './spectrum'

const rootReducer = combineReducers({
  spectrum,
  chart,
})

export default rootReducer;