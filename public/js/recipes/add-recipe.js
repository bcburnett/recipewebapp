/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import {LitElement, html, css} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import {ps} from './bcb-pantry';

export class BcbAddItem extends connect(store)( LitElement) {

  /**
   * lit-element observed properties
   */
  static get properties(){
    return {
      name: Object,
      lowlimit: Object,
      description: Object,
      comments: Object,
      category: Object,
      onhand:Object,
      pantryItems: Array,
      userid: String,
    };
  }

  constructor(){
    super();
    this.pantryItems=[];
  }


  /**
   * called after the first render, the shadow-dom is attached now.
   */
  firstUpdated(){
    this.name = this.shadowRoot.getElementById('name');
    this.lowlimit = this.shadowRoot.getElementById('lowlimit');
    this.description = this.shadowRoot.getElementById('description');
    this.comments = this.shadowRoot.getElementById('comments');
    this.category = this.shadowRoot.getElementById('category');
    this.onhand = this.shadowRoot.getElementById('onhand');
  }

  handleForm(){
    console.log(this.userid)
    const formData = {
      'name': this.name.value,
      'lowlimit': this.lowlimit.value,
      'description': this.description.value,
      'comments': this.comments.value,
      'category': this.category.value,
      'onhand': this.onhand.value,
      'userid':this.userid,
  };
  if(this.pantryItems.map(e=>e.name).includes(formData.name)){
    alert('name allready exists');
    return;
  }
  ps.addPantryItem(formData);
  
  }

  render(){
    return html`
  <h1>Add Item</h1>
  <div class="add">
    <p  > Name <input  type="text" id="name" Size="16"></p>
    <p  > Description <input  type="text" id="description" Size="16"></p>
    <p  > Comments <input  type="text" id="comments" Size="16"></p>
    <p  > Category <input  type="text" id="category" Size="16"></p>
    <p  > On Hand <input  type="number" id="onhand" Size="16"></p>
    <p  > Low Limit <input  type="number" id="lowlimit" Size="16"></p>
    <button @click="${e=>this.handleForm()}"  >add</button>
</div>
    `;
  }

stateChanged(state) {
  const app = state.pantry;
  this.userid = app.userdata._id;
}

}

customElements.define( 'bcb-add-item' ,BcbAddItem);
