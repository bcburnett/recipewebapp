/* jshint esversion:9*/
import { SEARCH_RESULT, EDIT_RECIPE } from "./recipe-actions.js";
const INITIAL_STATE = {
  searchResults: [],
  editRecipe: {}
};
export const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_RESULT:
      return { ...state,
        searchResults: [...action.item]
      };

    case EDIT_RECIPE:
      return { ...state,
        editRecipe: action.item
      };

    default:
      return state;
  }
};