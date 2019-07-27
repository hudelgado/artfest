import { BaseElement } from './../helpers/base-element';

export class AppSidebar extends BaseElement {
  render() {
    return this.html`
    <style>
      :host {
        display: block;
      }
      .container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 150;
      }
      .visible {
        pointer-events: auto;
      }
      .menu {
        background-color: #fff;
        color: #fff;
        position: relative;
        max-width: 400px;
        width: 90%;
        height: 100%;
        box-shadow: 0 2px 6px rgba(0, 0,0 0.5);
        webkit-transform: translateX(-103%);
        transform: translateX(-103%);
        display: flex;
        flex-direction: column;
        will-change: transform;
        z-index: 160;
        pointer-events: auto;
      }

      .visible .menu {
        webkit-transform: none;
        transform: none;
      }

      .animating .menu {
        transition: all 130ms ease-in;
      }

      .visible.animating .menu {
        transition: all 330ms ease-out;
      }
      .container:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        will-change: opacity;
        pointer-events: none;
        transition: opacity 0.3s cubic-besier(0,0,0.3,1);
      }
      .visible.container:after {
        opacity: 1;
        pointer-events: auto;
      }
      .header {
        width: 100%;
        height: 200px;
        background: black;
      }
    </style>
    <div class="container">
      <div class="menu">
        <div class="header"><slot name="header"></slot></div>
        <div class="content"><slot name="content"></slot></div>
      </div>
    </div>
    `;
  }
  constructor() {
    super();
    this.render();
    this.toggle = this.toggle.bind(this);
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._menu = this.query('.container');
  }
  query(sel) {
    return this.shadowRoot.querySelector(sel);
  };
  connectedCallback() {
    this._menu.addEventListener('click', this.toggle);
    this._menu.addEventListener('transitionend', this._onTransitionEnd);
  }
  disconnectedCallback() {
    this._menu.removeEventListener('click', this.toggle);
    this._menu.removeEventListener('transitionend', this._onTransitionEnd);
  }

  toggle() {
    this._menu.classList.add('animating');
    this._menu.classList.toggle('visible');
  }
  _onTransitionEnd() {
    this._menu.classList.remove('animating');
  }
}
AppSidebar.define('app-sidebar');
