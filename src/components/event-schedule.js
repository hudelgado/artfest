import { BaseElement } from './../helpers/base-element';
import hyper from 'hyperhtml';
import { style } from './../helpers/material-icons-css';
import './app-tabs';
import {parseDayAndMonth, parseHour} from './../helpers/tools';

class EventSchedule extends BaseElement {
  render() {
    var entries = this.data && this._toArray(this.data);
    return this.html`
     ${style()}
    <style>
      :host {
        display: block;
        cursor: default;
      }
    
      app-tabs {
        --app-tabs-color: var(--app-color-shows);
      }
      app-tab {
        cursor: pointer;
      }
    
      app-panel {
        padding: 1em;
      }
      app-panel > div {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      app-panel i {
        vertical-align: sub;
      }
    </style>
    <app-tabs role="tablist">
      ${entries && entries.map((entry, i) => this._getWire(i)`
        <app-tab role="tab" slot="tab">${entry.place}</app-tab>
        <app-panel role="tabpanel" slot="panel">
          <div>
            <div>
              <i class="material-icons">place</i>${this._getShowPlace(entry)}
            </div>
            <div>
              <i class="material-icons">calendar_today</i>${parseDayAndMonth(entry.date)}
            </div>
            <div>
              <i class="material-icons">access_time</i>${parseHour(entry.date)}
            </div>
          </div>
        </app-panel>`
      )}
    </app-tabs>
    `;
  }
  static get props() {
    return {
      data: {
        type: Object,
        observer: this.prototype.render
      }
    };
  }
  connectedCallback() {
    this.addEventListener('click', this._onClick);
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._onClick);
  }
  _onClick(evt) {
    evt.preventDefault();
  }
  _toArray(schedule) {
    return Object.keys(schedule).map(function (key) {
      var obj = { id: key };
      for (var prop in schedule[key]) {
        obj[prop] = schedule[key][prop];
      }
      return obj;
    });
  }
  _getShowPlace(show) {
    return show.place || 'a definir';
  }
}
EventSchedule.define('event-schedule');