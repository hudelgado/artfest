import { BaseElement } from './../helpers/base-element.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './../stores/store.js';
import { fetchItem, itemSelector } from './../stores/item.js';
export { fetchItem };

import './view-details-movie';
import './view-details-show';

import { SharedStyles} from '../shared-styles';
import { scrollToTop } from '../helpers/tools';

class ViewDetails extends connect(store)(BaseElement) {
  render() {
    const category = this.state.category,
        item = this.state.item;
    if (!item || !category) {
      return;
    }
    const movie = category === 'filmes' ? item : null;
    const show = category === 'grupos' ? item : null;
    const showViewDetailsHidden = category !== 'grupos';
    const movieViewDetailsHidden = category !== 'filmes';
    const categoryItems = this.state.items && this.state.items;

    const relatedItems = categoryItems && categoryItems.filter(i => i.slug != item.slug);
    scrollToTop();
    return this.html`
    ${SharedStyles()}
    <style>
      [hidden] {
        display: none;
      }
      .related-container.filmes {
        background: var(--app-color-movies);
      }
      .related-container.grupos {
        background: var(--app-color-shows);
      }

      .related {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(auto, 250px));
        grid-gap: 1em;
        padding: 1em;
      }
      .related.grupos {
        grid-template-columns: repeat(auto-fill, minmax(auto, 350px));
      }

      .related-entry {
        border-radius: 3px;
        display: flex;
        text-decoration: none;
        background: white;
        color: grey;
      }
      .related-entry .img {
        width: 75px;
        flex: none;
        background: lightgrey;
        background-size: cover;
        background-position: center;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .related-entry.grupos .img {
        width: 150px;
      }
      .related-entry .img .to-be-released {
        color: var(--color-app-movies);
      }
      .related-entry .img h5:not(.to-be-released) {
        display: none;
      }
      .related-entry .content {
        padding: 1em;
      }
      .related-entry h4,
      .related-entry h5 {
        margin: 0;
        line-height: 1em;
      }
      .related-entry h5 {
        font-weight: normal;
        font-size: 0.6em;
      }
      .header {
        display: block;
        padding: 1em;
      }
      .grupos .header {
        color: black;
      }
      .filmes .header {
        color: white;
      }
    </style>
      <view-details-show
        hidden=${showViewDetailsHidden}
        data=${show}>
      </view-details-show>
      <view-details-movie
      hidden=${movieViewDetailsHidden}
        data=${movie}>
      </view-details-movie>
      <aside class="${"container related-container " + category}">
        <header class="header">
          <h3>Outros ${category == 'filmes' ? 'filmes' : 'grupos'}</h3>
        </header>
        <div class="${`related ${category}`}">
          ${relatedItems && relatedItems.map((el, i) => this._getWire(i)`
            <a class="${'shadowed related-entry ' + category}" href="${'/detalhes/' + category.slice(0, -1) + '/' + el.slug}">
              <div class="img" style="${{'background-image': `url(${el.images && el.images.featured.url}`}}">
                <h5 class="${el['to_be_released'] ? "to-be-released" : ""}">Brevemente</h5>
              </div>
              <div class="content">
                <header>
                  <h4>${el.name}</h4>
                  <h5>${el.title || el.genre}</h5>
                </header>
              </div>
            </a>
          `)}
        </div>
      </aside>
      `;
  }
  get defaultState() {
    return {
      item: null,
      category: null
    }
  }
  stateChanged(state) {
    let item = itemSelector(state);
    if (!item) {
      return;
    }
    let categoryItems =  this._getStateSelectedCategoryItems(state.data, state.item.category);
    if (state.app.page == 'details' && (!this.state.item || this.state.item.id !== state.item.id || categoryItems != this.state.items)) {
      this.setState({
        item: item,
        category: state.item.category,
        items: categoryItems
      });
    }
  }
  _getStateSelectedCategoryItems(state, category) {
    const categoryMappings = {"filmes": "movies", "grupos": "shows"};
    return state.items && state.items[categoryMappings[category]];
  }
}
ViewDetails.define('view-details');