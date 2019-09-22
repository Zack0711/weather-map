import thunk from 'redux-thunk'
import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
/* eslint-enable */

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware = [
    ...middleware,
    createLogger({ stateTransformer: state => state }),
  ]
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware),
  ),
)

export default store;