// @flow
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'

export default function configureStore(initialState: Object = {}) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  )
}
