import hyper from 'hyperhtml';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { BaseElement } from '../helpers/base-element';

import { writeJsonLd } from './../helpers/tools.js';
import { SharedStyles } from './../shared-styles.js';
import './app-breadcrumb';
import './view-item-image';
import './app-link';
import './video-container';
import './events-calendar';

import { showTmpl } from './../templates/show';

function getImageClass(entry) {
  let orientation =  entry.width > entry.height ? "horizontal" : "vertical"
  return "item " + orientation;
}

class ViewDetailsShow extends BaseElement {
  render() {
    if (!this.state.item) {
      return;
    }
    let item = this.state.item;
    let cat = 'grupos';
    let name = item.artist;
    let img = item.images && item.images.featured ? item.images.featured : {};
    this._updatePageMeta(item);
    const breadcrumb = this._getEntryBreadCrumb(item);
    const links = item.links ? Object.keys(item.links).map((key) => { return {name: key, value: item.links[key]}}) : [];
    return this.html`
      ${SharedStyles()}
      <style>
        :host {
          display: block;
        }

        app-breadcrumb {
          color: black;
          background: var(--app-color-shows);
        }
        .main {
          display: flex;
        }
        .main article {
          flex: 5;
        }
        .main aside { 
          flex: 1;
          padding: 2em;
        }
        article .bio {
          padding: 1em;
        }
        .videos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, auto));
          grid-gap: 0.5em;
          overflow: hidden;
        }
        [hidden] {
          display: none;
        }
        .gallery-container .header {
          padding: 1em;
          color: black;
        }
        .gallery {
          display: grid;
          grid-gap: 5px;
          grid-template-columns: repeat(auto-fill, minmax(300px, auto));
          grid-auto-rows: 200px;
          padding: 1em;
        }
        .gallery a.item {
          overflow: hidden;
        }
        .gallery a.item.vertical {
          grid-row: span 3;
        }
        .gallery a.item .image {
          width: 100%;
        }
        view-item-image {
          max-height: 100vh;
        }
      
        @media(max-width: 600px) {
          .main {
            flex-direction: column;
          }
          .gallery {
            padding: 0;
          }
        }
      </style>
      <div class="container">
        <app-breadcrumb data=${breadcrumb}></app-breadcrumb>
        <div class="content main">
          <article>
            <div class="img-container">
              <view-item-image src="${img.url}" alt="${name}" placeholder="${img.placeholder}"></view-item-image>
            </div>
            <div class="bio">
              ${item.bio && item.bio.map((bio) => hyper.wire(item)`<p>${bio}</p>`)}
            </div>
          </article>
          <aside>
            <div hidden=${!item.composition}>
              <header><h5>Composição</h5></header>
              <ul>
                ${item.composition && item.composition.map( (entry) => hyper.wire()`<li>${entry.name} - ${entry.role}</li>`)}
              </ul>
            </div>
            <div class="video-container" hidden=${!item.videos}>
              <header><h3>Videos</h3></header>
              <div class="videos">
                ${item.videos && item.videos instanceof Array && item.videos.map((video) => hyper.wire()`<video-container url="${video.url}" thumb="${video.thumbnailUrl}" class="shadowed"></video-container>`)}
              </div>
            </div>
            <div class="links" hidden=${!item.links}>
              <header><h5>Ligações</h5></header>
                ${links.map( (link) => hyper.wire()`<app-link provider="${link.name}" userlink="${link.value}"></app-link>`)}
            </div>
          </aside>
        </div>
        <div>
          <div class="container gallery-container" hidden=${!(item.images && item.images.group)}>
            <header class="header"><h2>Galeria</h2></header>
            <div class="gallery filming">
              ${item.images && item.images.group && item.images.group.map( (entry, i) => hyper.wire()`
              <a class="${getImageClass(entry)}">
                <view-item-image class="image" clickable
                  src="${entry.url}"
                  alt="${entry.name}"
                  placeholder="${entry.placeholder}"></view-item-image>
              </a>
              `)}
            </div>
          </div>
          <events-calendar data=${item.schedule} hidden=${!item.schedule}></events-calendar>
        </div>
      </div>
      `;
  }
  get defaultState() {
    return {
      item: null
    };
  }
  static get props() {
    return {
      data: {
        type: Object,
        observer: this.prototype.updateItem
      }
    };
  }
  updateItem(item) {
    this.setState({item: item});
  }
  _updatePageMeta(item) {
    if (!item) {
      return;
    }
    updateMetadata({
      title: `${item.name} - Grupos`,
      description: item.genre,
      image: item.images ? item.images.featured.url : ''
    });
    writeJsonLd(showTmpl(item));
  }
  _getEntryBreadCrumb(show) {
    return [{
      name: 'Espectáculos',
      url: '/#espectaculos'
    }, {
      name: show.name,
      url: `/detalhes/grupo/${show.slug}`
    }];
  }
}
ViewDetailsShow.define('view-details-show');