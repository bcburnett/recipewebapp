/* jshint esversion:9*/
import { searchResult, editRecipe } from "./recipe-actions.js";
import { store } from '../store.js';
export class Ps {
  constructor() {
    this.userid = '';
    this.statechanged(store.getState());
    store.subscribe(() => this.statechanged(store.getState()));
    SOCKET.on('searchRecipes', data => store.dispatch(searchResult(data)));
    SOCKET.on('updateRecipe', data => store.dispatch(editRecipe(data)));
  }

  search(data) {
    SOCKET.emit('searchRecipes', data);
  }

  updateRecipe(data) {
    SOCKET.emit('updateRecipe', data);
  }

  fetchRecipe(id) {
    SOCKET.emit('fetchRecipe', id);
  }

  newRecipe() {
    SOCKET.emit('newRecipe');
  }

  deleteRecipe(id) {
    SOCKET.emit('deleteRecipe', id);
  }

  statechanged(state) {
    
  }

}
