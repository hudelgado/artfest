import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installRouter } from 'pwa-helpers/router';
import hyper from 'hyperhtml';

import { store } from './stores/store';
import { BaseElement } from './helpers/base-element';
import {scrollToPos, scrollToTop} from './helpers/tools';
import { navigate } from './stores/app';
import { writeJsonLd } from './helpers/tools';
import './components/view-header';

import { festivalTmpl } from './templates/festival';

const getScrollPos = () => document.documentElement.scrollTop;
const hideLoadingSplash = () => document.body.classList.remove('loading');

let ioSupported = ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype);
if (!ioSupported) {
  import('intersection-observer')
}
if ('define' in customElements
  && 'content' in document.createElement('template')) {
// platform is good!
} else {
  console.log('polyfilling the platform', document.registerElement, document.createElement('link'), document.createElement('template'));
  import('@webcomponents/webcomponentsjs/webcomponents-loader');
}

/**
 * @customElement
 * @polymer
 */
class ArtfestApp extends connect(store)(BaseElement) {
  constructor() {
    super();
    this.render();
  }
  render() {
    let page = this._page;
    let homePageActive = page === 'home',
        detailsPageActive = page === 'details',
        view404PageActive = page === '404';
    let partners = this.partners;
    let sponsors = this.sponsors;
    return  this.html`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          --app-primary-color: black;
          --app-secondary-color: rgb(201,00,24);
          --app-color-first: rgb(221,92,83);
          --app-color-second: rgb(210,0,44);
          --app-color-thrid: rgb(255,202,0);
          --app-color-fourth: rgb(151,212,217);
          --app-color-fifth: rgb(211,91,77);
  
          --app-color-movies: var(--app-secondary-color);
          --app-color-exhibitions: var(--app-color-fifth);
          --app-color-shows: var(--app-color-thrid);
        }
        view-header {
          display: block;
          height: 55px;
        }
        .page {
          display: none;
        }
        .page[active="true"] {
          display: block;
        }
        .footer {
          background: black;
          min-height: 2em;
        }
        .footer header {
          padding: 1em;
        }
        .footer.partners, .footer.sponsors {
          background: white;
        }
        .footer.partners .container, .footer.sponsors .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          grid-gap: 1rem;
          padding-bottom: 1em;
        }
        .footer.partners .container > a, .footer.sponsors .container > a {
          display: block;
          width: 100%;
          height: 60px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
        }
        .footer.main {
          padding: 0 1em;
          flex-wrap: wrap;
          display: flex;
        }
        .footer.main span.copyright {
          flex-grow: 1;
        }
        .footer.main span {
          font-size: 10pt;
          display:inline-block;
        }
        .footer.main span a {
          text-decoration: none;
          color: inherit;
        }
        .footer.main img {
          width: 40px;
          vertical-align: text-bottom;
        }

        .footer header h3 {
          color: rgb(74, 74, 74);
        }

        .main-content {
          display: grid;
          height: 100%;
          grid-template-columns: 1fr;
          grid-template-areas: "nav" "main" "footer";
          grid-template-rows: auto 1fr auto;
        }
        .main-content view-header {
          grid-area: nav;
        }
        .main-content .main {
          grid-area: main;
        }
        .main-content .footers {
          grid-area: footer;
        }
      </style>
      <main class="main-content">
        <view-header curr-page="${page}"></view-header>
        <div class="main">
          <view-home class="page" active=${homePageActive}></view-home>
          <view-details class="page" active=${detailsPageActive}></view-details>
          <view-404 class="page" active=${view404PageActive}></view-404>
        </div>
        <div class="footers">
          <div class="footer sponsors">
            <header><h3>Cofinanciado por</h3></header>
            <div class="container">
              ${sponsors && sponsors.map((sponsor) => 
                hyper.wire(sponsor)`<a href="" style="${'background-image: url("' + sponsor.logo.url + '"'}" target="_blank" rel="noopener" aria-label="${sponsor.name}"></a>`
              )}
            </div>
          </div>
          <div class="footer partners">
            <header><h3>Parceiros</h3></header>
            <div class="container">
              ${partners && partners.map((partner) => 
                hyper.wire(partner)`<a href="${partner.url}" style="${'background-image: url("' + partner.logo.url + '"'}" target="_blank" rel="noopener"  aria-label="${partner.name}"></a>`
              )}
            </div>
          </div>
          <div class="footer main">
              <span class="copyright">&copy; Copyright 2018 - Artfest Patrimónios</span> 
              <span class="produced">Uma produção de <a href="http://associarte.pt" target="_blank" rel="noopener"><img alt="associarte" src="images/logos/aca.png"/> Associarte</a></span>
          </div>
        </div>
      </main>
    `;
  }
  static get observedAttributes() {
    return ['app-title'];
  }
  created() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    hideLoadingSplash();
  }
  _updateMeta(page, title) {
    const pageTitle = `${title} - ${page}`;
    updateMetadata({
        title: pageTitle,
        description: pageTitle
    });
    writeJsonLd(festivalTmpl());
  }
  stateChanged(state) {
    let oldPage = this._page;
    if (state.app.page && state.app.page != oldPage) {
      this._page = state.app.page;
      this.render();
      this._updateScrollPosition(this._page, oldPage);
      this._updateMeta(this._page, this.appTitle);
    }
    if (state.data) {
      let items = state.data.items;
      if (items.partners && !this.partners) {
        this.partners = items.partners;
        this.render();
      }
      if (items.sponsors && !this.sponsors) {
        this.sponsors = items.sponsors;
        this.render();
      }
    }
    if (state.app.page && state.app.page == 'home' && state.app.opts && state.app.opts.length > 0 && state.app.opts[state.app.opts.length-1].startsWith('#')) {
      let elem = this.shadowRoot.querySelector('view-home');
      elem && elem.dispatchEvent(new CustomEvent('select-elem', { bubbles: false, detail: { selector:  state.app.opts[state.app.opts.length-1] }}))
    }
  }
  _updateScrollPosition(currPage, oldPage) {
    if (oldPage == 'home') {
      this._oldScrollPos = getScrollPos();
    }
    if (currPage == 'home' && this._oldScrollPos) {
      scrollToPos(this._oldScrollPos);
    } else {
      scrollToTop();
    }
  }
}
ArtfestApp.define('artfest-app');