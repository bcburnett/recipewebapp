/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import { LitElement, html } from '../../node_modules/lit-element/lit-element.js';
import { connect } from '../../node_modules/pwa-helpers/connect-mixin.js';
import { recipes } from './recipe-reducer.js';
import { store } from '../store.js';
import './edit-recipe.js'
store.addReducers({
  recipes,
});
import { Ps } from './recipe-sockets.js';
export const ps = new Ps();

export class BcbRecipe extends connect(store)(LitElement) {
  /**
   * lit-element observed properties
   */
  static get properties() {
    return {
      searchInput: Object,
      searchResults: Array,
      CurrentRecipe: Object,
      page: Number,
      editRecipe: Object,
      editInstructions: Boolean,
      editIngredients: Boolean,
    };
  }

  constructor() {
    super();
    this.showrecipe = 'hide';
    this.searchResults = [];
    this.CurrentRecipe = '';
    this.page = 1;
  }
  /**
   * called after the first render, the shadow-dom is attached now.
   */
  firstUpdated() {
    this.searchInput = this.shadowRoot.getElementById('search');
    this.recipe = this.shadowRoot.getElementById('edit-recipe')
  }

  doSearch() {
    const obj = {};
    obj.search = this.searchInput.value;
    obj.page = this.page;
    ps.search(obj);
    this.setActive('none');
  }

  nextPage() {
    this.page += 1;
    this.doSearch();
  }

  firstPage() {
    this.page = 1;
    this.doSearch();
  }

  prevPage() {
    this.page -= 1;
    if (this.page < 1) this.page = 1;
    this.doSearch();
  }


  setActive(a) {
    this.searchResults.forEach((e, i) => {
      this.shadowRoot.getElementById('srch' + i).classList.remove('active');
    });
    if (a !== 'none') this.shadowRoot.getElementById('srch' + a).classList.add('active');
  }

  newRecipe() {
    ps.newRecipe();
  }

  render() {
    return html`
        <style>
        :host{
          color: #666;
        }
    .urlbutton{
      width:100%;
      background: transparent;
      color: #aaa;
      margin-top:-10px;
    }
    .active{
      background:rgba(255,255,255,.25);
    }
    .display{
      display:block;
    }
    .hide{
      display:none;
    }
    </style>
<div>
<br />
<button @click="${() => this.prevPage()}">${this.page - 1} <</button>
<input type="text" id="search" @change="${() => this.firstPage()}" >
<span>${'page ' + this.page + ' of ' + (this.searchResults.length!==0? this.searchResults[this.searchResults.length-1] / 10:0)}</span>
<button @click="${() => this.firstPage()}">Search</button>
<button @click="${() => this.nextPage()}">> ${this.page + 1}</button>
<br />
<br />
<button class="urlbutton" style="background:green" @click="${() => this.newRecipe()}">Add a New Recipe</button>
<div  style="cursor:pointer;">
  ${this.searchResults.map((r, i) => html`
    <h3 id="${'srch' + i}"style="margin:10px;" @click="${() => {
        ps.fetchRecipe(r._id);
        this.setActive(i);
      }}" > ${r.title} </h3>
`)}
</div>
</div>
<div >
<edit-recipe id="edit-recipe"></edit-recipe>
</div>
    `;
  }

  stateChanged(state) {
    const app = state.recipes;

    if (this.searchResults !== app.searchResults) {
      this.searchResults = app.searchResults;
    }
    this.recipe.classList.remove('hide')
    this.recipe.classList.remove('display')
    this.recipe.classList.add(Object.keys(app.editRecipe).length == 0?'hide':'display');

  }
}
customElements.define('bcb-recipe', BcbRecipe);
