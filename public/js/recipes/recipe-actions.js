/*jshint esversion: 6 */
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const searchResult = item => {
  return {
    type: SEARCH_RESULT,
    item
  };
};
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const editRecipe = item => {
  return {
    type: EDIT_RECIPE,
    item
  };
};