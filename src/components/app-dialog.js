import { BaseElement } from './../helpers/base-element';

const KEYCODE = { ESC: 27, ENTER: 13 };

class AppDialog extends BaseElement {
  render() {
    return this.html`
    <style>
      :host {
        display: block;
        position: relative;
      }
      .ripple {
        height: 1px;
        width: 1px;
        background: rgba(0,0,0,0.7);
        position: fixed;
        transition: transform 0.2s cubic-bezier(0.6, 0, 0.3, 1);
        transform: scale(0);

        will-change: transform;
        z-index: 1000;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
      }
      .ripple.expand {
        transform: scale(1);
        width: 100%;
        height:100%;
        opacity: 1;
        visibility: visible;
      }
      .content {
        position: relative;
        width: 100%;
        height: 100%;
        background: black;

        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        background: red;
        border-radius: 25%;
        color: white;
      }
      .close:before {
        content: 'x'; // here is your X(cross) sign.
        color: #fff;
        font-weight: 300;
        font-family: Arial, sans-serif;
        display: block;
        margin-top: -10px;
        margin-left: 5px;
      }
    </style>
    <div class="ripple">
      <div class="content">
        <slot></slot>
        <div tabindex="0" class="close"></div>
      </div>
    </div>
    `
  }
  constructor() {
    super();
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }
  connectedCallback() {
    requestAnimationFrame(_ => {
      this.render();
      this._ripple = this.shadowRoot.querySelector('.ripple');
      this._close = this.shadowRoot.querySelector('.close');
      this.addEventListeners();
    });
  }
  disconnectedCallback() {
    this.removeEventListeners();
  }
  addEventListeners() {
    this._ripple && this._ripple.addEventListener('click', this.collapse);
    this._close && this._close.addEventListener('click', this.collapse);
    this._close && this._close.addEventListener('keyup', this._onKeyUp);
  }
  removeEventListeners() {
    this._ripple && this._ripple.removeEventListener('click', this.collapse);
    this._close && this._close.removeEventListener('click', this.collapse);
    this._close && this._close.removeEventListener('keyup', this._onKeyUp);
  }
  static get observedAttributes() { return []; }
  attributeChangedCallback() {}
  expand(srcElem) {
    if (srcElem) {
      let box = srcElem.getBoundingClientRect();
      this._ripple.style.left = `0`;
      this._ripple.style.top = `0`;
    }
    this._ripple.classList.add('expand');
    this._setModalStylesOnBody();
    this._close.focus();
    this.dispatchEvent(new CustomEvent('expand', {
      bubbles: true
    }));
  }
  collapse() {
    this._ripple.style.transition = '';
    this._ripple.style.transform = '';
    this._unsetModalStylesOnBody();
    this.dispatchEvent(new CustomEvent('collapse', {
      bubbles: true
    }));
    this._ripple.classList.remove('expand');
  }
  _setModalStylesOnBody() {
    document.body.style.overflow = 'hidden';
    document.body.style.inert = 'true';
  }
  _unsetModalStylesOnBody() {
    document.body.style.overflow = '';
    document.body.style.inert = '';
  }
  _onKeyUp(evt) {
    if (evt.altKey) {
      return;
    }
    switch (evt.keyCode) {
      case KEYCODE.ESC:
      case KEYCODE.ENTER:
        this.collapse();
        break;
    }
  }
}
AppDialog.define('app-dialog');