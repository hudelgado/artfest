import { BaseElement } from './../helpers/base-element';

class AppBreadcrumb extends BaseElement {
  render() {
    return this.html `
      <style>
        :host {
          display: block;
          --app-breadcrumb-text-color: black;
        }
        ol {
          list-style: none;
          display: flex;
          font-size: 0.75em;
          padding: 1em;
          margin: 0;
        }
        li {
          padding: 0 5px;
        }
        li:not(:first-child):before {
          content: ">";
          margin-right: 10px;
        }
        a {
          text-decoration: none;
          color: var(--app-breadcrumb-text-color);
        }
      </style>
      <ol>
      ${this.data && this.data.map((entry, i) => `<li><a href="${entry.url}">${entry.name}</a></li>`)}
      <ol>
    `;
  }
  get defaultState() {
    return {
      data: {}
    }
  }
}
AppBreadcrumb.define('app-breadcrumb');