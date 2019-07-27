import { BaseElement } from './../helpers/base-element';
class AppLink extends BaseElement {

  render() {
    let url;
    let provider = this._getProviderDetails();
    if (provider) {
      url = provider.url + this.userlink;
    }
    return this.html`
    <style>
      :host {
        display: block;
      }
      span {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: grey;
        margin-right: 5px;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    </style>
    <span></span>
    <a href="${url}" target="_blank" rel="noopener" alt="${this.provider || 'external link'}">${this.userlink}</a>
    `
  }
  constructor() {
    super();
    this.providersUrls = {
      facebook: {url: 'http://www.facebok.com/', logoUrl: 'images/logos/facebook-58x58.svg'}
    }
  }
  static get observedAttributes() {
    return ['provider', 'userlink'];
  }
  attributeChangedCallback(prop, old, curr) {
    this.render();
    if (prop == 'provider') {
      this._span = this._span || this.shadowRoot.querySelector('span');
      if (this._span) {
        let provider = this._getProviderDetails();
        this._span.style.backgroundImage = "url(" + provider.logoUrl + ")";
      }
    }
  }
  _getProviderDetails() {
    return this.providersUrls[this.provider];
  }
}
AppLink.define('app-link');