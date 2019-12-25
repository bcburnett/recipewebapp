/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from 'lit-element/lit-element.js';
export class BcbInput extends LitElement {
  static get properties() {
    return {
      label: String,
      bg: {
        type: String,
        reflect: true,
      },
      fg: {
        type: String,
        reflect: true,
      },
      name: String,
      type: {
        type: String,
        attribute: true,
        reflect: true,
      },
      width: Number,
      value: {
        type: String,
        attribute: true,
      },
      max: Number,
      min: Number,
      title: String,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const input = document.createElement('input');
    input.id = this.name;
    input.name = this.name;
    input.type = this.type;
    input.value = this.value;
    this.appendChild(input);
  }

  constructor() {
    super();
    this.value = '';
    this.bg = 'transparent';
    this.width = '75px';
    this.name = '';
    this.type = 'text';
    this.max = Number.MAX_VALUE;
    this.min = Number.MIN_VALUE;
    this.fg = this.fg| 'white';
  }

  render() {
    return html`
    <style>
  .form-group {
    display:block;
    position:relative;
  font-size: 1rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  text-align:center;
  height:35px;
  margin-bottom:10px;
  border-bottom: 1px solid white;
  width:100%;
}

.form-control-placeholder {
  position:absolute;
  top: 5px;
  left:0;
  padding: 9px 0 0 13px;
  transition: all 200ms;
  opacity: .5;
  cursor:pointer;
  width: max-content;
  font-size: 10px;
  margin-left:-12px;
  color:white;
  font-size: 98%;
}

.form-control{
  position:absolute;
  top:10px;
  left:0;
  border:0;
  background:${this.bg};
  outline: none;
  width: 100%;
  color: white;
  cursor:pointer;
}


.form-control:focus + .form-control-placeholder,
.form-control:valid + .form-control-placeholder {
  transform: translate3d(0, -90%, 0);
  font-size: 80%;
  opacity: 1;
}


    </style>
      <div class="form-group">
        <input
        autocomplete="on"
        type="${this.type}"
        id="input"
        class="form-control"
        value="${this.value}"
        max="${this.max}"
        min="${this.min}"
        @input="${this.input}"
        @change="${this.change}"
        title="${this.value}"
        name="this.name"
        required>
        <label
          class="form-control-placeholder"
          for="input">
          ${this.label}
        </label>
      </div>

    `;
  }

  input() {
    this.value = this.shadowRoot.getElementById('input').value;
    this.title = this.value||'';
  }

  change() {
    this.value = this.shadowRoot.getElementById('input').value;
    this.title = this.value;
    this.dispatchEvent(new CustomEvent('bcbforminputchange', {
      detail: {
        value: this.value,
      },
    }));
  }

  inputChange(e) {
    if (!e) return;
    this.value = this.shadowRoot.getElementById('input').value;
    this.title=this.value;
  }


  updated() {
    this.shadowRoot.getElementById('input').value = this.value;
    this.inputChange();
  }
}
customElements.define('bcb-form-input', BcbInput);
