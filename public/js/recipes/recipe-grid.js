/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import {setCurrentItem} from './pantry-actions';
export class BcbItemGrid extends connect(store)(LitElement) {

  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
     
      pantryItems: Array,
      userid: String,
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

  }


  render() {
    return html`
    <div>
      <table border=1 style="margin:auto;">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>comments</th>
          <th>Category</th>
          <th>On Hand</th>
          <th>Low Limit</th>
          <th>Edit</th>
        </tr>
${this.pantryItems.map((item)=>html`
<tr>
  <td>${item.name}</td>
  <td>${item.description}</td>
  <td>${item.comments}</td>
  <td>${item.category}</td>
  <td>${item.onhand}</td>
  <td>${item.lowlimit}</td>
  <td><button @click="${()=>store.dispatch(setCurrentItem(item))}">Edit</button></td>
</tr>
`)}
      </table>
    </div>




    `
  }

  stateChanged(state) {
    const app = state.pantry;
    this.pantryItems = app.inventory;
    this.userid = app.userdata._id;
  }

}

customElements.define('bcb-item-grid', BcbItemGrid);
