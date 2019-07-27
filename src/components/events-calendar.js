import { BaseElement } from './../helpers/base-element';
import hyper from 'hyperhtml';
import { parseDayAndMonth, parseHour } from '../helpers/tools';
import { style } from './../helpers/material-icons-css';

const showTmpl = (show) => hyper.wire()`
  <div><i class="material-icons">calendar_today</i><span class="show-date">${parseDayAndMonth(show.date)}</span></div>
  <div><i class="material-icons">access_time</i><span class="show-time">${parseHour(show.date)}</span></div>
  <div hidden=${!show.location}><i class="material-icons">place</i><span class="show-place">${show.location}</span></div>
`;

const calendarEntryTmpl = (data) => Object.keys(data).map( (key) => hyper.wire()`
  ${Array.isArray(data[key]) ? 
    hyper.wire()`
    <div class="show shadowed">
      <header><h3>${key.slice(0,1).toUpperCase()+key.slice(1)}</h3></header>
      ${data[key].sort((a,b) => new Date(a.date) - new Date(b.date)).map((show) => hyper.wire()`
        <div class="show-content centered-container">
          <div class="show-artist">${show.artist}</div>
          <div class="show-info">${showTmpl(show)}</div>
        </div>
      </div>
      `)}
    ` :
    hyper.wire()`
      <div class="show shadowed">
      <header><h3>${data[key].place}</h3></header>
      <div class="show-content centered-container">
        <div class="show-info">${showTmpl(data[key])}</div>
      </div>
    </div>
    `
  }
`);

class EventsCalendar extends BaseElement {
  render() {
    return this.html`
    ${style()}
    <style>
      :host {
        display: block;
      }
      .calendar-container {
        display: grid;
        padding: 0 1em;
        grid-template-columns: repeat(auto-fill, minmax(250px, auto));
        grid-gap: 1em;
      }
      .calendar-container .show header {
        color: #000;
      }
      .calendar-container .show {
        width: 100%;
        max-width: 400px;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 3px;
        margin: 10px;
        color: black;
      }
      .calendar-container .show header {
        display: block;
        width: 100%;
        text-align: center;
        background: var(--app-color-shows);
        border-bottom: 1px solid lightgrey;
      }
      .calendar-container .show .show-content {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--app-color-shows);
      }
      .show-info {
        display: grid;
        justify-content: space-evenly;
        font-size: 14pt;
        text-align: center;
      }
      .show-info i {
        vertical-align: sub;
      }
      .header h2 {
        padding: 1em;
        color: black;
      }
      .show-artist {
        padding: 0.5em;
        background: var(--app-color-shows);
        color: black;
      }
      @media(max-width: 500px) {
        .calendar-container {
          padding: 0;
        }
        .calendar-container .show {
          margin: 0;
        }
      }
      @media(max-width: 800px) {
        .calendar-container {
          flex-direction: column;
        }
        .calendar-container .show {
          max-width: initial;
        }
      }
    </style>
    <div class="calendar">
      <header class="header"><h2>Calendário</h2></header>
      <div class="calendar-container">${calendarEntryTmpl(this.data)}</div>
    </div>
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
}
EventsCalendar.define('events-calendar');