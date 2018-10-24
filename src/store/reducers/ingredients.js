import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    default:
      return state;
  };
};

export default reducer;

