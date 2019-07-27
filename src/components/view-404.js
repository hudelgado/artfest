import { SharedStyles } from './../shared-styles.js';
import { BaseElement } from './../helpers/base-element.js';
import { store } from './../stores/store.js';

class View404 extends BaseElement {
  render() {
    return this.html`
      ${SharedStyles()}
      <h2>Ups, alguma coisa correu mal..</h2>
      <p>Pedimos desculpa mas não conseguimos encontrar o endereço pedido.</p>
      <p>Tente novamente partindo da <a href="/" >página inicial</a>.</p>
    `;
  }
}
View404.define('view-404');