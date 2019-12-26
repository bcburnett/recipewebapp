/* eslint-disable require-jsdoc */

/* jshint esversion:9*/
import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import { store } from '../store.js';
import { pantry } from "./pantry-reducer.js";
import { Ps } from "./pantry-sockets.js";
import "./bcb-add-item.js";
import "./bcb-edit-item.js";
import "./bcb-item-grid.js";
store.addReducers({
  pantry
});
export const ps = new Ps();
export class BcbPantry extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      name: Object,
      lowlimit: Object,
      description: Object,
      comments: Object,
      category: Object,
      onhand: Object,
      pantryItems: Array,
      userid: String
    };
  }

  constructor() {
    super();
    this.pantryItems = [];
  }
  /**
   * called after the first render, the shadow-dom is attached now.
   */


  firstUpdated() {
    ps.getPantryItems();
  }

  render() {
    return html`
    <div style="margin:auto;">
<bcb-add-item style="display:inline-block;border: 1px solid brown;text-align:left;padding:10px;margin-right:25px;"></bcb-add-item>
<bcb-edit-item style="display:inline-block;border: 1px solid brown;text-align:left;padding:10px;margin-bottom:25px;"></bcb-edit-item>
<bcb-item-grid style="margin-top:25px;"></bcb-item-grid>
</div>
    `;
  }

  stateChanged(state) {
    const app = state.pantry;
    this.pantryItems = app.inventory;
    this.userid = app.userdata._id;
  }

}
customElements.define('bcb-pantry', BcbPantry);