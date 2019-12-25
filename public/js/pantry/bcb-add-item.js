/* eslint-disable require-jsdoc */

/* jshint esversion:9*/
import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";
import { connect } from "../../node_modules/pwa-helpers/connect-mixin.js";
import { store } from '../store.js';
import { ps } from "./bcb-pantry.js";
import "./bcb-input.js";
export class BcbAddItem extends connect(store)(LitElement) {
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
  /**
   * lit-element styles array. external style sheets can be added here.
   */


  static get styles() {
    return [css`
    .add{
      position:relative;
      display: inline-block;
      width: 300px;
    }
    h2{
      margin:auto;
    }
`];
  }

  constructor() {
    super();
    this.pantryItems = [];
  }
  /**
   * called after the first render, the shadow-dom is attached now.
   */


  firstUpdated() {
    this.name = this.shadowRoot.getElementById('name');
    this.lowlimit = this.shadowRoot.getElementById('lowlimit');
    this.description = this.shadowRoot.getElementById('description');
    this.comments = this.shadowRoot.getElementById('comments');
    this.category = this.shadowRoot.getElementById('category');
    this.onhand = this.shadowRoot.getElementById('onhand');
  }

  handleForm() {
    console.log(this.userid);
    const formData = {
      'name': this.name.value,
      'lowlimit': this.lowlimit.value,
      'description': this.description.value,
      'comments': this.comments.value,
      'category': this.category.value,
      'onhand': this.onhand.value,
      'userid': this.userid
    };

    if (this.pantryItems.map(e => e.name).includes(formData.name)) {
      alert('name allready exists');
      return;
    }

    ps.addPantryItem(formData);
    this.clearForm();
  }

  clearForm() {
    this.name.value = '';
    this.lowlimit.value = '';
    this.description.value = '';
    this.comments.value = '';
    this.category.value = '';
    this.onhand.value = '';
  }

  render() {
    return html`
  <div class="add">
  <h2>Add Item</h2>
    <bcb-form-input  type="text" id="name" Size="16" label="Name" value=''></bcb-form-input>
    <bcb-form-input  type="text" id="description" Size="16" label="Description" value=''></bcb-form-input>
    <bcb-form-input  type="text" id="comments" Size="16" label="Comments" value=''></bcb-form-input>
    <bcb-form-input  type="text" id="category" Size="16" label="Category" value=''></bcb-form-input>
    <bcb-form-input  type="text" id="onhand" Size="16" label="On Hand" value=''></bcb-form-input>
    <bcb-form-input  type="text" id="lowlimit" Size="16" label="Low Limit" value=''></bcb-form-input>
    <button @click="${e => this.handleForm()}"  >add</button>
</div>
    `;
  }

  stateChanged(state) {
    const app = state.pantry;
    this.userid = app.userdata._id;
  }

}
customElements.define('bcb-add-item', BcbAddItem);