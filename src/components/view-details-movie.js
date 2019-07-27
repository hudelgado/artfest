import { BaseElement } from '../helpers/base-element';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { writeJsonLd } from './../helpers/tools.js';
import { SharedStyles } from './../shared-styles.js';
import { style } from './../helpers/material-icons-css';
import './view-item-image';
import './app-breadcrumb';

import {movieTmpl} from './../templates/movie';

import hyper from 'hyperhtml';

function getItemClass(entry) {
  let vertical = entry.width < entry.height ? ' vertical' : '';
  return 'item' + vertical;
}
class ViewDetailsMovie extends BaseElement {
  render() {
    if (!this.data) {
      return;
    }
    let item = this.data;
    this._updatePageMeta(item);
    let images = item.images || {};
    let img = images.featured ? images.featured.url : null;
    let name = item.name;
    let breadcrumb = this._getEntryBreadCrumb(item);
    return this.html`
       ${SharedStyles()}
       ${style()}
      <style>
        :host {
          display: block;
        }
        h1 {
          margin: 0 0 1em 0;
        }
        .container {
          display: flex;
          flex-direction: column;
        }
      
        .content {
          height: 100%;
          overflow: hidden;
          margin: 0px;
          display: flex;
          box-sizing: border-box;
          flex-wrap: wrap-reverse;
        }
      
        .column {
          display: flex;
          flex-direction: column;

          flex: 1;
          padding: 1em;
        }
      
        article {
          flex-grow: 1;
          margin-left: 1em;
        }

        .container .content.main aside {
          margin: 0 auto;
        }
      
        aside {
          flex-shrink: 0;
          flex-grow: 0.1;
          height: 100%;
        }

        aside.movie-image {
          width: 370px;
        }

        app-breadcrumb {
          --app-breadcrumb-text-color: white;
          background-color: var(--app-color-movies);
        }
      
        .trailers {
          display: grid;
          grid-gap: 1px;
          grid-template-columns: repeat( auto-fit, minmax(133px, 400px) );
          grid-template-rows: minmax(150px, 300px);
        }
        .gallery-container {
          padding: 2em 0;
        }
        .gallery-container .gallery {
          background: black;
        }

        aside header h2 i.material-icons {
          font-size: 48px;
          position: relative;
          top: 10px;
        }
        aside header h3 {
          margin-left: 1em;
        }
      
        .gallery-container header h5 {
          padding: 0 1em;
        }

        .gallery {
          display: grid;
          grid-gap: 1px;
          grid-auto-rows: minmax(300px, auto);
          grid-template-columns: repeat(auto-fill, minmax(400px, auto));
        }

        .gallery .item {
          display: grid;
          grid-gap: 1px;
          grid-auto-rows: minmax(150px, auto);
          position: relative;
          overflow: hidden;
        }
        .gallery .item.vertical {
          grid-row: span 2;
        }

        .gallery .image {
          width: 100%;
          height: 100%;
          position: absolute;
        }

        .gallery .image:hover {
          opacity: 0.9;
          transition: .2s ease-in;
        }

        [hidden] {
          display: none;
        }

        .gallery.exibicao  .item {
          grid-row: span 2;
        }
        @media (max-width: 800px) {
          .column {
            padding: 0;
          }
          .gallery.exibicao  .item {
            grid-row: span 3;
          }
          .content {
            flex-direction: column-reverse;
          }
        }

      </style>
      
      <div class="container">
        <app-breadcrumb data=${breadcrumb}></app-breadcrumb>
        <div class="content main">
          <article class="column">
            <div>
              ${item.description && item.description.map((desc, i) => hyper.wire()`<p>${desc}</p>`)}
            </div>
            <div class="trailers" hidden=${!item.videos}>
              ${item.videos && item.videos.trailer && item.videos.trailer.map( trailer =>  hyper.wire(trailer)`<video-container url="${trailer.url}" thumb="${trailer.thumbnailUrl}" class="shadowed" alt="Trailer"></video-container>`)}
            </div>
          </article>
          <aside class="column movie-image" hidden=${!img}>
            <view-item-image src="${img}" alt="${name}"></view-item-image>
          </aside>
        </div>
        <aside hidden=${!images.filmagens && !images.estreia} class="gallery-container">
          <header hidden=${!images.filmagens}>
            <h2><i class="material-icons">photo</i>Galeria</h2>
            <h3>Filmagens</h3>
          </header>
          <div class="container gallery-container" hidden=${!images.filmagens}>
            <div class="gallery filming">
              ${images.filmagens && images.filmagens.map( (entry, i) => hyper.wire()`
              <a class="${getItemClass(entry)}">
                <view-item-image class="image" clickable
                  src="${entry.url}"
                  placeholder="${entry.placeholder}"></view-item-image>
              </a>
              `)}
            </div>
          </div>
          <header hidden=${!images.estreia}>
            <h3>Estreia</h3>
          </header>
          <div class="container gallery-container" hidden=${!images.estreia}>
            <div class="gallery debut">
            ${images.estreia && images.estreia.map( (entry, i) => hyper.wire()`
              <a class="${getItemClass(entry)}">
                <view-item-image class="image" clickable
                  src="${entry.url}"
                  placeholder="${entry.placeholder}"></view-item-image>
              </a>
              `)}
            </div>
          </div>

          <header hidden=${!images.exibicao}>
            <h3>Exibição</h3>
          </header>
          <div class="container gallery-container" hidden=${!images.exibicao}>
            <div class="gallery exibicao">
            ${images.exibicao && images.exibicao.map( (entry, i) => hyper.wire()`
              <a class="${getItemClass(entry)}">
                <view-item-image class="image" clickable
                  src="${entry.url}"
                  placeholder="${entry.placeholder}"></view-item-image>
              </a>
              `)}
            </div>
          </div>
        </aside>
      
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
        observer: this.prototype.render
      }
    };
  }
  _updatePageMeta(item) {
    if (!item) {
      return;
    }
    updateMetadata({
      title: `${item.name} - Filmes`,
      description: item.title,
      image: item.images ? item.images.featured.url : ''
    });
    writeJsonLd(movieTmpl(item));
  }
  _getEntryBreadCrumb(movie) {
    return [{
      name: 'Filmes',
      url: '/#filmes'
    }, {
      name: movie.name,
      url: `/detalhes/filme/${movie.slug}`
    }];
  }
}
ViewDetailsMovie.define('view-details-movie');