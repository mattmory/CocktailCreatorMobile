import {createStore, combineReducers, compose} from 'redux';

import ingredientsReducer from "./reducers/ingredients";


let composeEnhancers = compose;
if(__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


const rootReducer = combineReducers(
  {
    ingredients: ingredientsReducer
  }
);

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;