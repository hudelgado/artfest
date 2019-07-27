/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { BaseElement } from './../helpers/base-element';
import './app-dialog';

const $ = (el, selector) => el.querySelector(selector);
const $$ = (el, selector) => $(el.shadowRoot, selector);

const io = new IntersectionObserver(
  entries => {
    for (let el of entries) {
      if (!el.target._loaded) {
        if (el.isIntersecting && el.target.getAttribute('src')) {
          let innerImg = $$(el.target, 'img');
          innerImg = innerImg || el.target._createImgElem.call(el.target);
          innerImg.src = el.target.getAttribute('src');
          if (innerImg.src) {
            let dest = $$(el.target, '#placeholder');
            dest && dest.appendChild(innerImg);
            el.target._loaded = true;
            el.target.classList.remove('error');
          }
        }
      }
    }
  }
);

class ViewItemImage extends BaseElement {
  render() {
    let alt=this.getAttribute('alt') || '',
      placeholder=this.getAttribute('placeholder'),
      src=this.getAttribute('src'),
      loaded=this._loaded;
    return this.html`
      <style>
      :host {
          display: block;
          width: 100%;
          height: 100%;
        }
      :host(.clickable) {
          cursor: pointer;
        }

        #placeholder {
          width: 100%;
          height: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
        }

        #placeholder[loaded="true"] {
          filter: blur(0);
          transition: 1s filter;
        }

        img {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: var(--img-position);
        }

        :host([center]) img {
          left: -9999px;
          right: -9999px;
          max-width: none;
        }
        #placeholder[loaded="false"] img {
          opacity: 0;
        }
        #placeholder[loaded="true"] img {
          opacity: 1;
          transition: 1s opacity;
        }
      </style>

      <div id="placeholder" loaded=${loaded} style="${`background-image: url('${placeholder}')`}"></div>
      <app-dialog id="#overlay" style="${'background-image: ' + placeholder ? placeholder : `url('${this.bckImgSrc}')` }">
        
      </app-dialog>
    `;  
  }
  static get observedAttributes() {
    return ['alt', 'placeholder', 'src', 'clickable'];
  }
  attributeChangedCallback(prop, previous, changed) {
    if (!this.overlayElem) {
      this.overlayElem = this.shadowRoot.querySelector('app-dialog');
    }
    if (prop == 'src') {
      this._loaded = false;
    }
    if (prop == 'clickable') {
      this.classList.add('clickable');
      this._isClickable = true;
    }
    this.render();
  }

  _createImgElem() {
    let img = document.createElement('img');
    img.alt = this.alt;
    img.onload = this.onload.bind(this);
    img.onerror = this.onerror.bind(this);
    img.onclick =  this.onclick.bind(this);
    return img;
  }

  onload(e) {
    this._loaded = true;
    this.classList.remove('error');
    this.render();
    let dest = $$(this, '#placeholder');
    dest.style.backgroundImage = '';
  }

  onclick(e) {
    if (this.clickable != null) {
      this.overlayElem.expand(this);
      this.overlayElem.shadowRoot.querySelector('.content').style.backgroundImage = `url('${this.src}')`;
    }
  }

  onerror(e) {
    if (!this.placeholder) {
      this.classList.add('error');
    }
  }

  connectedCallback() {
    io.observe(this);
  }

  disconnectedCallback() {
    io.unobserve(this);
  }
}
ViewItemImage.define('view-item-image');