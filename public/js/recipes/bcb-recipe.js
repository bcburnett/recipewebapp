/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* jshint esversion:9*/
import { LitElement, html } from '../../node_modules/lit-element/lit-element.js';
import { connect } from '../../node_modules/pwa-helpers/connect-mixin.js';
import { recipes } from './recipe-reducer.js';
import { store } from '../store.js';
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
    this.searchResults = [];
    this.CurrentRecipe = '';
    this.page = 1;
    this.editInstructions = false;
    this.editIngredients = false;
  }
  /**
   * called after the first render, the shadow-dom is attached now.
   */


  firstUpdated() {
    this.searchInput = this.shadowRoot.getElementById('search');
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

  newTab(url) {
    window.open(url, '_blank');
  }

  setActive(a) {
    this.searchResults.forEach((e, i) => {
      this.shadowRoot.getElementById('srch' + i).classList.remove('active');
    });
    if (a !== 'none') this.shadowRoot.getElementById('srch' + a).classList.add('active');
  }

  displayRecipe() {
    const r = this.editRecipe;
    this.CurrentRecipe = '';

    if (Object.keys(r).length == 0) {
      return; // nothing to do
    }

    const addIngredient = document.createElement('button');
    addIngredient.textContent = 'Add Ingredient';
    addIngredient.addEventListener('click', () => {
      console.log(addIngredient, 'insert');
      this.updateArray('NEWINGREDIENT', 'insert', r.ingredients.length);
    });

    const ingredients = r.ingredients.map((d, i) => {
      const div = document.createElement('div');
      div.classList.add(this.editIngredients ? 'display' : 'hide');

      const ingredient = document.createElement('input');
      ingredient.classList.add('ingredient');
      ingredient.addEventListener('change', () => this.updateArray('INGREDIENT', ingredient.value, i));
      ingredient.value = d.text;
      div.appendChild(ingredient);

      const quantity = document.createElement('input');
      quantity.classList.add('ingredient');
      quantity.addEventListener('change', () => this.updateArray('QUANTITY', quantity.value, i));
      quantity.value = r.quantity[i].text;
      div.appendChild(quantity);

      const unit = document.createElement('input');
      unit.classList.add('ingredient');
      unit.addEventListener('change', () => this.updateArray('UNIT', unit.value, i));
      unit.value = r.unit[i].text;
      div.appendChild(unit);

      const button = document.createElement('button');
      button.textContent = 'delete';
      button.addEventListener('click', () => {
        this.updateArray('DELETEINGREDIENT', 'delete', i);
      });
      div.appendChild(button);

      const button1 = document.createElement('button');
      button1.textContent = 'insert';
      button1.addEventListener('click', () => {
        console.log(i, button1, 'insert');
        this.updateArray('NEWINGREDIENT', 'insert', i);
      });
      div.appendChild(button1);

      const hr = document.createElement('hr');
      div.appendChild(hr);

      return div;
    });
    ingredients[ingredients.length - 1].appendChild(addIngredient);

    const displayIngredients = document.createElement('ul');
    displayIngredients.classList.add('ingredient');
    r.ingredients.forEach((d, i) => {
      const li = document.createElement('li');
      li.textContent = `${d.text.substring(0, 40)} -- ${r.quantity[i].text}, ${r.unit[i].text}`;
      displayIngredients.appendChild(li);
    });

    const addDirection = document.createElement('button');
    addDirection.textContent = 'Add Direction';
    addDirection.addEventListener('click', () => {
      this.updateArray('NEWDIRECTION', 'NEWINSTRUCTION', 0);
    });

    const instructions = r.instructions.map((r, i) => {
      const div = document.createElement('div');
      div.classList.add(this.editInstructions ? 'display' : 'hide');


      const ta = document.createElement('textarea');
      ta.classList.add('ingredient');
      ta.addEventListener('change', () => this.updateArray('DIRECTION', ta.value, i));
      ta.value = r.text;
      div.appendChild(ta);

      const button = document.createElement('button');
      button.textContent = 'delete';
      button.addEventListener('click', () => {
        this.updateArray('DELETEINSTRUCTION', 'delete', i);
      });
      div.appendChild(button);

      const button1 = document.createElement('button');
      button1.textContent = 'insert';
      button1.addEventListener('click', () => {
        console.log(i, button1, 'insert');
        this.updateArray('INSERTINSTRUCTION', 'insert', i);
      });
      div.appendChild(button1);

      return div;
    });
    instructions[instructions.length - 1].appendChild(addDirection);


    // <button class="urlbutton" @click="${() => this.updateArray('NEWDIRECTION', 'NEWINSTRUCTION', 0)}">Add Instruction</button>

    const displayDirections = document.createElement('ul');
    displayDirections.classList.add('ingredient');
    r.instructions.forEach((r, i) => {
      const li = document.createElement('li');
      li.textContent = r.text;
      displayDirections.appendChild(li);
    });

    const comments = r.comments.map((r, i) => {
      const ta = document.createElement('textarea');
      ta.classList.add('ingredient');
      ta.addEventListener('change', () => this.updateArray('COMMENT', ta.value, i));
      ta.value = r.text;
      return ta;
    });

    const editDescription = document.createElement('textarea');
    editDescription.classList.add('ingredient');
    editDescription.classList.add('hide');
    editDescription.addEventListener('change', () => this.updateArray('DISC', editDescription.value, 0));
    editDescription.value = r.description;

    const description = document.createElement('div');
    description.classList.add('ingredient');
    description.textContent = r.description;
    description.addEventListener('click', () => editDescription.classList.toggle('hide'));


    const title = document.createElement('input');
    title.classList.add('ingredient');
    title.classList.add('title');
    title.addEventListener('change', () => this.updateArray('TITLE', title.value, 0));
    title.value = r.title;

    const url = document.createElement('input');
    url.classList.add('ingredient');
    url.id = 'url';
    url.addEventListener('change', () => this.updateArray('URL', url.value, 0));
    url.value = r.url;

    const image = document.createElement('input');
    image.classList.add('ingredient');
    image.id = 'image';
    image.addEventListener('change', () => this.updateArray('IMAGE', image.value, 0));
    image.value = r.image;


    this.CurrentRecipe = html`
      ${title}
    <div style="
      display:flex;
      flex-direction:row;
    ">

      <div style=" 
      padding: 15px; 
      align-self:center;
      width:100%"
      >
      <br>
      <img 
      src="${r.image ? r.image.startsWith('http:/') ? 'https:/' + r.image.substring(6) : r.image : ''}" 
      style="
      width:350px;
      justify-self:center;
      "
      >
      <br>
      ${image}
      <br>
      <br>
      <br>
      <br>
      <button class="urlbutton" @click="${() => this.newTab(r.url)}">Visit Page</button>
      ${url}
      </div>

      <div style=" padding:15px; width:100%;align-self:center;">
      <h4>Ingredients</h4>
      ${displayIngredients}
      <button class="urlbutton" @click="${() => {
        this.editIngredients = !this.editIngredients;
        this.displayRecipe();
      }}">
      Edit Ingredients
      </button>
      ${ingredients}
      </div>

    </div>
    <div>
      ${description}
      ${editDescription}
      <h4>Directions</h4>
      ${displayDirections}
      <button class="urlbutton" @click="${() => {
        this.editInstructions = !this.editInstructions;
        this.displayRecipe();
      }}">Edit Instructions</button>
      ${instructions}
      <h3>Comments</h3>
      ${comments}
      <br>
      <br>
      <button class="urlbutton" @click="${() => this.updateArray('NEWCOMMENT', 'NEWCOMMENT', 0)}">Add Comment</button>
    </div>
    <div style="width:45vw; padding:15px;">
    <br>
    <button class="urlbutton" @click="${() => this.deleteRecipe(r._id)}">Delete This Recipe</button>
    <br>
    <br>
    ${comments}
    <br>
    <br>
    <button class="urlbutton" @click="${() => this.updateArray('NEWCOMMENT', "NEWCOMMENT", 0)}">Add Comment</button>
    <h4>Directions</h4>
    ${instructions}
    <button class="urlbutton" @click="${() => this.updateArray('NEWDIRECTION', "NEWINSTRUCTION", 0)}">Add Instruction</button>
    </div>
    `;
  }

  updateArray(action, div, i) {
    const obj = this.editRecipe;

    switch (action) {
      case 'DELETEINSTRUCTION':
        obj.instructions.splice(i, 1);
        break;

      case 'INSERTINSTRUCTION':
        obj.instructions.splice(i, 0, { text: 'New Direction' });
        break;

      case 'INGREDIENT':
        obj.ingredients[i].text = div.trim();
        break;

      case 'NEWINGREDIENT':
        obj.ingredients.splice(i, 0, { text: 'New Ingredient' });
        obj.quantity.splice(i, 0, { text: '0.0' });
        obj.unit.splice(i, 0, { text: 'Measure' });
        break;

      case 'DELETEINGREDIENT':
        obj.ingredients.splice(i, 1);
        obj.quantity.splice(i, 1);
        obj.unit.splice(i, 1);
        break;

      case 'QUANTITY':
        obj.quantity[i].text = div.trim();
        break;

      case 'UNIT':
        obj.unit[i].text = div.trim();
        break;

      case 'DIRECTION':
        obj.instructions[i].text = div.trim();
        break;

      case 'NEWDIRECTION':
        obj.instructions = [...obj.instructions, {
          text: 'new direction',
        }];
        break;

      case 'DISC':
        obj.description = div;
        break;

      case 'TITLE':
        obj.title = div;
        break;

      case 'URL':
        obj.url = div;
        break;

      case 'IMAGE':
        obj.image = div;
        break;

      case 'COMMENT':
        obj.comments[i].text = div.trim();
        break;

      case 'NEWCOMMENT':
        obj.comments = [...obj.comments, {
          text: 'new comment',
        }];
        break;

      default:
        break;
    }

    ps.updateRecipe(obj);
  }

  newRecipe() {
    ps.newRecipe();
  }

  deleteRecipe(id) {
    ps.deleteRecipe(id);
    this.doSearch();
  }

  makeNonEditable(div) {
    div.style.background = 'transparent';
  }

  makeEditable(div) {
    div.style.background = 'rgba(0,0,0,.25)';
  }

  render() {
    return html`
        <style>
    .ingredient{ 
      width:100%;
        color:white;
         border:none;
         background: transparent;
    }
    textarea{ 
      width:100%;
        color:white;
         border:none;
         background: transparent;
         height:7vh;
    }
    .urlbutton{
      width:100%;
      background: transparent;
      color: white;
      margin-top:-10px;
    }
    .active{
      background:rgba(255,255,255,.25);
    }
    input{
      font-size:1rem;
    }
    textarea{
      font-size:1.25rem;
    }
    .display{
      display:block;
    }
    .hide{
      display:none;
    }

  li{
    padding: 5px;
    font-size: 1.25rem;
  }

  .large{
    font-size: 2rem;
  }
  .title{
    font-size: 2rem;
    background: rgba(255, 125, 125, 0.25);
    width:100%;
    text-align:center;
    margin-top:15px;
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
    <h3 id="${'srch' + i}"style="color:white;margin:10px;" @click="${() => {
        ps.fetchRecipe(r._id);
        this.setActive(i);
      }}" > ${r.title} </h3>
`)}
</div>
</div>
<div style="
  display:grid;
  grid-template-columns:1fr, 1fr;
  justify-content:space-evenly;
  text-align:left">
${this.CurrentRecipe}
</div>
    `;
  }

  stateChanged(state) {
    const app = state.recipes;

    if (this.searchResults !== app.searchResults) {
      this.searchResults = app.searchResults;
    }

    this.editRecipe = app.editRecipe;
    this.displayRecipe();
  }
}
customElements.define('bcb-recipe', BcbRecipe);
