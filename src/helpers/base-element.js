import HyperHTMLElement from 'hyperhtml-element'
import hyper from 'hyperhtml';
import { ObservableMixin } from './observable';

export class BaseElement extends ObservableMixin(HyperHTMLElement) {

  constructor() {
    super();
    this._wires = [];
    this._initDocumentContainer();
  }

  useShadowRoot() {
    return true;
  }
  _initDocumentContainer() {
    this.useShadowRoot() && this.attachShadow({mode: 'open'});
  }

  _getWire(i) {
    return this._wires[i] || (this._wires[i] = hyper.wire());
  }

  _shouldRender() {
    return true;
  }

  setState(state) {
    return super.setState(state, !this.classList.contains('hidden') && this._shouldRender());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // ignoring first changed call to avoid duplicated call because of created
    if (this._shouldRender() && oldValue && oldValue !== newValue) {
      this.render();
    }
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