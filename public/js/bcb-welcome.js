/* eslint-disable no-tabs */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {LitElement, html} from '../node_modules/@polymer/lit-element/lit-element.js';
import {Styles} from './bcb-welcome-css.js';
import {store} from './store.js';
import {connect} from '../../node_modules/pwa-helpers/connect-mixin.js';
export class BcbWelcome extends connect(store)(LitElement) {
  static get properties() {
    return {
      user: String,
      profile: Object,

    };
  }

  constructor() {
    super();
    this.profile ={
      facebook: '',
      twitter: '',
      hobbies: '',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNiYAAAAAkAAxkR2eQAAAAASUVORK5CYII=',
    };
    this.socket = SOCKET;
    this.socket.emit('welcome');
    this.socket.on('welcome', (data) => {
      if (!data) window.location ='/users/login';
      this.user = data.name;
      delete data.password;
      localStorage.setItem('data', JSON.stringify(data));
    });
    this.socket.on('login', (e)=> window.location = '/users/login');
  }

  firstUpdated() {
    this.socket.emit('welcome');
  }

  render() {
    return html`
  ${Styles}
  <style>
    p{
      font-size:.6rem;
    }
  </style>
     `;
  }
}
customElements.define('bcb-welcome', BcbWelcome);
