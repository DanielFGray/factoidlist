// @flow
import { combineReducers } from 'redux'
import * as actions from '../actions/factoids'

function factoidsReducer(state = { collection: [], db: null, loading: false }, action) {
  switch (action.type) {
    case actions.CLEAR_FACTOIDS:
      return ({
        ...state,
        db: null,
        collection: [],
        loading: false,
      })
    case actions.REQUEST_FACTOIDS:
      return ({
        ...state,
        db: action.factdb,
        collection: [],
        loading: true,
      })
    case actions.RECEIVE_FACTOIDS:
      return ({
        ...state,
        db: action.factdb,
        collection: action.factoids,
        loading: false,
      })
    case actions.RECEIVE_FACTOIDS_ERROR:
      return ({
        ...state,
        db: action.factdb,
        collection: [ { name: '', fact: action.error } ],
        loading: false,
      })
    default:
      return state
  }
}

export default combineReducers({
  factoids: factoidsReducer,
})
