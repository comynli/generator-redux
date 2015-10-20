import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import { NAME_CHANGED, AGE_CHANGED } from '../actions/index';

let initialState = {name: 'comyn', age: 18};

function user(state=initialState, action={}) {
  switch (action.type) {
    case NAME_CHANGED:
      return Object.assign({}, state, {
        name: action.name
      });
    default :
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  router
});

export default rootReducer;
