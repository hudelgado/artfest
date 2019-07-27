/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import './items-listing-entry.js';
import { BaseElement } from './../helpers/base-element';
import { SharedStyles} from '../shared-styles';
import './events-calendar';

import {parseDayAndMonth} from './../helpers/tools';

class ItemsListing extends BaseElement {
  render() {
    let categorySlug = this.category == 'movie' ? 'filme' : 'grupo';
    let headerText = this.category == 'movie' ? 'Filmes' : 'Espectáculos';
    let items = this.data || [];
    this._computeSchedule();
    return this.html`
      ${SharedStyles()}
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
        :host([category="movie"]) {
          background-color: var(--app-color-movies);
        }
        :host([category="show"]) {
          background-color: var(--app-color-shows);
        }
        .grid-container {
          display: grid;
          grid-gap: 1px;
          grid-template-columns: repeat(auto-fill, minmax(300px, auto));
          grid-gap: 10px;
          grid-row-gap: 35px;
        }
        :host([category="show"]) .grid-container {
          grid-auto-rows: minmax(auto, 500px);
        }
        section header h1 {
          color: white;
        }
        :host([category="show"]) section header h1 {
         color: black;
        }
        section header h1 i.material-icons {
          margin-right: 0.5em;
          font-size: 52px;
          position: relative;
          top: 15px;
        }
        section a {
          position: relative;
          overflow: hidden;
          text-decoration: none;
          border-radius: 3px;
        }
        section a items-listing-entry {
          width: 100%;
          height: 100%;
          background-color: white;
        }
        .calendar-entries-container {
          display: flex;
          justify-content: space-around;
        }

        events-calendar {
          background: white;
        }

        [hidden] {
          display: none;
        }
      </style>
      <section hidden="${!items.length}">
        <header>
          <h1>${headerText}</h1>
        </header>
        <div class="grid-container">
          ${items.map((item, i) => this._getWire(i)`
            <a class="shadowed" href="${item ? `/detalhes/${categorySlug}/${item.slug}`: ''}">
              <items-listing-entry data="${item}" category="${this.category}" placeholder="${item.images && item.images.featured.placeholder}"></items-listing-entry>
            </a>` )}
        </div>
      </section>
      <events-calendar data=${this.schedule} hidden=${this.category != 'show'}></events-calendar>
`;
  }
  static get props() {
    return {
      data: {
        type: Array,
        observer: this.prototype.render
      }
    };
  }
  static get observedAttributes() {
    return ['category'];
  }
  _computeSchedule() {
    this.schedule = {};
    this.category == 'show' && this.data && this.data.forEach((item) => { Object.keys(item.schedule || {} ).forEach( (key) => {if (!this.schedule[key]) { this.schedule[key] = [] }  let toAdd = item.schedule[key];toAdd.artist=item.name; this.schedule[key].push(toAdd)}) });
  }
}
ItemsListing.define('items-listing');