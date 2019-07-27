import { BaseElement } from './../helpers/base-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './../stores/store.js';
import { itemSelector } from './../stores/item.js';
import '@wct/app-bar';
import  './app-sidebar';

class ViewHeader extends connect(store)(BaseElement) {
  render() {
    return this.html`
      <style>
      .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;  /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all WebKit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;

        /* Support for IE. */
        font-feature-settings: 'liga';
      }
      </style>
      <style>
        :host {
          display: block;
        }
        [hidden] {
          display: none;
        }
        .logo-icon {
          display: inline-block;
          width: 48px;
          height: 48px;
          background-image: url('images/manifest/icon-48x48.png');
          background-repeat: no-repeat;
          background-position: right;
        }
        app-bar a {
          text-decoration: none;
          color: white;
        }
        app-bar a.movies i.material-icons {
          color: var( --app-color-movies);
        }
        app-bar a.shows i.material-icons {
          color: var( --app-color-shows);
        }
        app-bar a.exhibitions i.material-icons {
          color: var( --app-color-exhibitions);
        }
        app-bar a span {
          vertical-align: text-bottom;
          padding-left: 5px;
        }
        app-bar [slot="navigation"] {
          margin-left: 5px;
        }
      </style>
      
      <app-bar page="${this.currPage}">
        <a slot="back" hidden="${this.currPage !== 'details'}" href="#" class="material-icons">arrow_back</a>
        <a slot="logo" class="logo-icon" href="#" aria-label="logo" alt="logo"></a>
        <span slot="title">${this.title}</span>
        <span slot="subtitle">${this.subtitle}</span>
        <a slot="navigation" href="#filmes" aria-label="Movies" alt="Movies" class="movies">
          <i class="material-icons item">movie</i><span>Filmes</span>
        </a>
        <a slot="navigation" href="#exposicoes" aria-label="Expositions" alt="Expositions" class="exhibitions">
          <i class="material-icons item">photo</i><span>Exposições</span>
        </a>
        <a slot="navigation" href="#espectaculos" aria-label="Shows" alt="Shows" class="shows">
          <i class="material-icons item">mic</i><span>Espectáculos</span>
        </a>
        <a slot="navigation" href="#comunicacoes" aria-label="Comunicacoes" alt="Comunicacoes" class="comunicacoes">
          <i class="material-icons item">email</i><span>Comunicacoes</span>
        </a>
      </app-bar>
      <app-sidebar>
        <div slot="header"><a href="/"><img src="images/manifest/icon-192x192.png" aria-label="logo" alt="logo"/><a></div>
        <div slot="content" style="color: black; padding: 1em;">
          <a href="/#filmes" style="display: block;color: black;text-decoration: none;">Filmes</a>
          <a href="/#exposicoes" style="display: block;color: black;text-decoration: none;">Exposições</a>
          <a href="/#espectaculos" style="display: block;color: black;text-decoration: none;">Espectáculos</a>
          <a href="/#comunicacoes" style="display: block;color: black;text-decoration: none;">Comunicações</a>
        </div>
      </app-sidebar>
     `;
  }
  static get observedAttributes() {
    return ['curr-page'];
  }
  constructor() {
    super();
    this._originalTitle = 'Artfest Patrimónios';
  }
  created() {
    this.render();
    this._appBar = this.shadowRoot.querySelector('app-bar');
    this._appSidebar = this.shadowRoot.querySelector('app-sidebar');
    this._toggleSidebar = this._toggleSidebar.bind(this);
    this._appBar.addEventListener('toggle-sidebar', this._toggleSidebar);
  }
  disconnectedCallback() {
    this._appBar.removeEventListener('toggle-sidebar', this._toggleSidebar);
  }
  stateChanged(state) {
    let item = itemSelector(state);
    this.categories = state;
    if (item && state.app.page == 'details') {
      this.title = item.name;
      this.subtitle = item.title || item.genre;
    } else {
      this.title = this._originalTitle;
      this.subtitle = '';
    }
    this.render();
  }
  _toggleSidebar() {
    this._appSidebar.toggle();
  }
}
ViewHeader.define('view-header');