/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import {store} from '../store.js';
import {addItem, addItems, userdata} from './pantry-actions.js';
export class Ps {
  constructor() {
    this.userid = '';
    this.statechanged(store.getState());
    store.subscribe(() => this.statechanged(store.getState()));
    SOCKET.on('pantryItem', (data) => store.dispatch(addItem(data)));
    SOCKET.on('allPantryItems', (data) => store.dispatch(addItems(data)));
    SOCKET.on('welcome', (data) => store.dispatch(userdata(data)));
    SOCKET.emit('welcome');
  }

  addPantryItem(item) {
    SOCKET.emit('addPantryItem', item);
  }

  updatePantryItem(item) {
    SOCKET.emit('updatePantryItem', item);
  }

  getPantryItems() {
    SOCKET.emit('getPantryItems', this.userid);
  }

  statechanged(state) {
    if (this.userid !== state.pantry.userdata._id) {
      this.userid = state.pantry.userdata._id;
      SOCKET.emit('getPantryItems', this.userid);
    }
  }
}
