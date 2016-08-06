import { combineReducers } from 'redux';
import * as actions from '../actions/factoids';

function factoidsReducer(state = { collection: [], db: null }, action) {
  switch (action.type) {
    case actions.REQUEST_FACTOIDS:
      return {
        ...state
        , db: action.factdb
        , collection: []
      };
    case actions.RECEIVE_FACTOIDS:
      return {
        ...state
        , db: action.factdb
        , collection: action.factoids
      };
    case actions.RECEIVE_FACTOIDS_ERROR:
      return {
        ...state
        , db: action.factdb
        , collection: [ { name: '', fact: action.error } ]
      };
    default:
      return state;
  }
}

export default combineReducers({
  factoids: factoidsReducer
});
