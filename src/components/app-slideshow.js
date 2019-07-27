import { BaseElement } from './../helpers/base-element';
import hyper from 'hyperhtml';

import {parseDayMonthYear, parseHour} from '../helpers/tools'


function getShowDate(date) {
  return parseDayMonthYear(date) + ' ' + parseHour(date);
}

function getSlideItemClass(item) {
  let movieClass = item.type == 'movie' ? ' movie' : ''
  return 'info' + movieClass;
}

const itemsTmpl = function(items) {
  return items && items.map( (item, i)  => {
    let selected = this._selected == i ? 'selected' : '';
    return this._getWire(i)`
    <div class=${`slide ${selected}`} data-slide=${item.slug}>
      <div class="${getSlideItemClass(item)}">
        <view-item-image
          src="${item.images.featured.url}"
          placeholder="${item.images.featured.placeholder}"
          alt="${item.name}"></view-item-image>
      </div>
      <div class="calendar">
        <header><h2 style="margin: 0;">${item.name}</h2></header>
        <header><h3>Próximos Eventos</h3></header>
        ${item.nextShows && item.nextShows.map( show => `<div>${show.place}<span>${getShowDate(show.date)}</span></div>`)}
      </div>
    </div>
`}, this)};

class AppSlideshow extends BaseElement {
  render() {
    return this.html`
    <style>
      :host {
        display: block;
        position: relative;
        overflow: hidden;
      }
      .slide {
        display: flex;
        flex-wrap: wrap-reverse;
      }
      .slide:not(.selected) {
        display: none;
      }
      .slide .info {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 4;
        background: var(--app-color-movies);
      }
      .info view-item-image {
        height: auto;
        width: 100%;
      }
      .slide .calendar {
        flex: 1.5;
        padding: 1em;
        color: white;
        background: var(--app-color-movies);
      }
      .slide .calendar h2 {
        text-align: center;
      }
      .slide .calendar h3 {
        font-size: 1em;
      }
      .slide .calendar div {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .nav-container {
        width: 300px;
        height: 30px;
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        justify-content:center;
        align-items:center;
      }
      .nav-container .nav {
        display: inline-block;
        background: white;
        border: 1px solid black;
        height: 100%;
        flex-grow: 0.1;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 10em;
        opacity: 0.5;
      }

      .nav.selected {
        background: red;
      }

      @media(max-width: 750px) {
        .slide {
          flex-direction: column;
        }
        .info view-item-image {
          height: 50vh;
          width: 100%;
        }
        .nav-container {
          bottom: 4em;
        }
      }

    </style>
    ${itemsTmpl.call(this, this.items)}
    <div class="nav-container">
      ${this.items && this.items.map( (item, i) => hyper.wire()`<div onclick=${this._onclick} data-slide=${item.slug} class="${`nav ${this._selected == i ? 'selected' : ''}`}"></div>`)}
    </div>
    `;
  }
  constructor() {
    super();
    this._onclick = this._onclick.bind(this);
    this._advanceSlider();
  }
  static get props() {
    return {
      items: {
        type: Object,
        observer: this.prototype._resetSelected
      }
    };
  }
  _advanceSlider() {
    this.interval = setInterval(function(slider) {
      if (!slider.items) {
        return;
      }
      slider._selected = (slider._selected + 1) % slider.items.length;
      slider.render();
    }, 5000, this);
  }
  _onclick(evt) {
    clearInterval(this.interval);
    let oldSelected = this._selected;
    let container = this.shadowRoot.querySelector('.nav-container');
    let nodes = Array.prototype.slice.call(container.children);
    this._selected = nodes.indexOf(evt.target);
    evt.preventDefault();
    oldSelected != this._selected && this.render();
    this._advanceSlider();
  }
  _resetSelected() {
    this._selected = 0;
    this.render();
  }
}
AppSlideshow.define('app-slideshow');