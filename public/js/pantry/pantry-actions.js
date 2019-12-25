/*jshint esversion: 6 */
export const ADD_ITEM = 'ADD_ITEM';
export const addItem = item => {
  return {
    type: ADD_ITEM,
    item
  };
};
export const ADD_ITEMS = 'ADD_ITEMS';
export const addItems = item => {
  return {
    type: ADD_ITEMS,
    item
  };
};
export const USERDATA = 'USERDATA';
export const userdata = item => {
  return {
    type: USERDATA,
    item
  };
};
export const CURRENTITEM = 'CURRENTITEM';
export const setCurrentItem = item => {
  console.log(item);
  return {
    type: CURRENTITEM,
    item
  };
};