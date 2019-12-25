/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { ps } from './bcb-recipe';
import './bcb-input';

export class BcbEditRecipe extends connect(store)(LitElement) {

  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      obj: Object,
      ingredients: Array,
      instructions: Array,
    };
  }

 
  constructor() {
    super();
    this.obj = {};
  }


  /**
   * called after the first render, the shadow-dom is attached now.
   */
  firstUpdated() {

  }

  render() {

    return html`
    <style>
    .ingredient{ 
      width:100%;
        color:white;
         border:none;
    }
    .comment{ 
      width:100%;
       background:rgba(0,0,0,.25);
        color:white;
         border:none;
         height: 100px;
    }
    </style>
        <h3>Edit Item</h3>
    <div style="
      display:flex; flex-direction: row;justify-content:space-evenly;text-align:left;width:100%;
      ">
      <div style="width:450px">
        <h4>Ingredients</h4>
        ${this.ingredients}
        <button>Add</button>
      </div>
      <div style="width:450px">
        <h4>Instructions</h4>
        ${this.instructions}
        <button>Add</button>
      </div>
    </div>
    `;
  }

  updateArray(action, div, i) {
    const obj = { ...this.obj };
    switch (action) {
      case 'INGREDIENT':
        obj.ingredients[i].text = div.textContent;
        ps.updateRecipe(obj);
        break;
      case 'INSTRUCTIONS':
        obj.instructions[i].text = div.textContent;
        ps.updateRecipe(obj);
        break;
      default:
        break;
    }
    div.style.background = "transparent";
    div.contentEditable = false;

  }


  makeEditable(div) {
    div.style.background = "rgba(0,0,0,.25)";
    div.contentEditable = true;
  }

  updateObject() {
    if (Object.keys(this.obj).length == 0) return;
    this.ingredients="";
    this.ingredients = this.obj.ingredients.map((o, i) => {
      return html`
    <div
      class="ingredient"
      id="${"ig" + i}"
      @click="${()=>this.makeEditable(this.shadowRoot.getElementById("ig" + i))}"
      @blur="${(e) => {
        console.log(e);
        this.updateArray('INGREDIENT', this.shadowRoot.getElementById("ig" + i), i);
      }
        }">
    ${o.text}
    </div>
    `;});

    this.instructions = '';
    this.instructions = this.obj.instructions.map((o, i) => {
      return html`
    <div 
    class="ingredient"
      id="${"in" + i}" 
      @click="${()=>this.makeEditable(this.shadowRoot.getElementById("in" + i))}"
      @blur="${() => this.updateArray('INSTRUCTIONS', this.shadowRoot.getElementById("in" + i), i)}">
      ${o.text}
      </div>
    `;});

    this.comments = this.obj.comments.map((o, i) => {
      return html`
    <textarea 
      id="${"cm" + i}" 
      @change="${() => this.updateArray('INSTRUCTIONS', this.shadowRoot.getElementById("cm" + i), i)}">
      ${o.text}
      </textarea>
      <br />
    `;});

  }



  stateChanged(state) {
      console.log(state.recipes);
      this.obj = {...state.recipes.editRecipe};
      if(this.obj.score) delete this.obj.score;
    this.updateObject(this.obj);
  }

}

customElements.define('edit-recipe', BcbEditRecipe);
