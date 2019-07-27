/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { BaseElement } from './../helpers/base-element';
import './view-item-image';
import './event-schedule';

class ItemsListingEntry extends BaseElement {
  render() {
    let item = this.item || {};
    let category = this.category;
    const title = item ? item.name || item.artist : '';
    const subtitle = item ? item.genre || item.title : '';
    const thumbnail = item && item.images ? item.images.featured.url : '';
    const desc = item ? item.description || item.bio || ['<i>Sem descrição.</i>'] : ['<i>Sem descrição.</i>'];
    const isDescHidden = this.category !== 'movie' || thumbnail;
    const isInfoHidden = thumbnail && this.category === 'movie';
    const sectionIcon = this.category == 'movie' ? 'movie' : 'mic';
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
          display: grid;
          grid-template-rows: auto 1fr auto;
          grid-template-columns: 1fr;
          grid-template-areas: "header" "main" "footer";
          color: var(--app-primary-color);
          font-size: 12pt;
          line-height: 1.3;
        }
        h3 {
          -webkit-margin-before: 0;
        }
        h2 {
          -webkit-margin-before: 0;
          -webkit-margin-after: 0;
        }
        .info {
          display: block;
          position: relative;
        }
        :host([category=movie]) .info {
          border-bottom: 1px solid var(--app-color-movies);
        }
        :host([category=show]) .info {
          border-bottom: 1px solid var(--app-color-shows);
        }
        .info .icon {
          position: absolute;
          right: 0;
          top: 0;
          object-position: center;
          transform-origin: center;
          background: white;
          border-radius: 50%;
        }
        .header-container {
          grid-area: header;
        }
        .header-container .icon i.material-icons {
          font-size: 48px;
          padding: 5px;
        }
        .header-container .info .content {
          padding: 5px 1em;
        }
        .desc {
          padding: 0.25rem 2.5rem 0.25rem 1.5rem;
        }
        .subtitle {
          font-size: 0.8em;
          margin-left: 0.5em;
        }
        view-item-image:hover {
          opacity: 0.9;
          transition: .2s ease-in;
        }
        .desc {
          grid-area: main;
        }
        .schedule {
          grid-area: footer;
        }
        [hidden] {
          display: none;
        }
      </style>

      <div class="header-container">
        <div class="info">
          <div class="icon"><i class="material-icons">${sectionIcon}</i></div>
          <div class="content">
            <header><h2>${title}</h2></header>
            <div class="subtitle" hidden="${!subtitle}"><h3>${subtitle}</h3></div>
          </div>
        </div>
      </div>
      <view-item-image hidden="${!thumbnail}" src="${thumbnail}" alt="${title}" placeholder="${this.placeholder}"></view-item-image>
      <div hidden=${!item.schedule} class="schedule">
        <event-schedule data=${item.schedule}></event-schedule>
      </div>
      <div class="desc" hidden="${isDescHidden}">
        ${desc.map(desc => `<p>${desc}</p>`)}
      </div>


      `;
  }

  static get observedAttributes() {
    return ['category', 'placeholder'];
  }
  attributeChangedCallback(prop, old, curr) {
    if (prop == 'placeholder' && curr)  {
      this.render();
    }
  }
  get item() {
    return this.data;
  }
  static get props() {
    return {
      data: {
        type: Object,
        observer: this.prototype.render
      }
    };
  }
}
ItemsListingEntry.define('items-listing-entry');