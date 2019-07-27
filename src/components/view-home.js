import { connect } from 'pwa-helpers/connect-mixin.js';

import { SharedStyles } from './../shared-styles.js';
import { BaseElement } from './../helpers/base-element.js';
import { store } from './../stores/store.js';
import { data, itemListSelector, loadAll } from './../stores/data.js';

import './items-listing.js';
import './video-container';

function $$(base, id) { return  base.shadowRoot.querySelector(id); }

class ViewHome extends connect(store)(BaseElement) {
  render() {
    let exhibitions = this._items && (this._items['exhibitions'] || []);
    let movies = this._items && (this._items['movies'] || []);
    let shows = this._items && (this._items['shows'] || []);
    return this.html`
      ${SharedStyles()}
      <style>
        :host {
          display: block;
          background-color: rgba(0,0,0,0);
        }
        items-listing {
          padding: 2em;
        }
        .slideshow {
          width: 100%;
          height: 500px;
          background: var(--app-color-movies);
        }
        @media(max-width:765px) {
          .slideshow {
            height: 800px;
          }
        }

        .expositionsContainer {
          background-color: var(--app-primary-color);
          padding: 10em 5em;
          position: relative;
          color: white;
        }

        .expositionsContainer .title {
          color: white;
        }

        .expositionsContainer > p:last-of-type {
          margin-bottom: 3em;
        }

        .columns {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, auto));
          grid-gap: 0.5em;
          overflow: hidden;
          grid-auto-rows: 200px;
        }
        .columns.cartazes {
          grid-template-columns: repeat(auto-fill, minmax(225px, auto));
        }
        .columns.cartazes .column {
          grid-row: span 2;
        }

        .festInfo {
          background-color: rgb(151,212,217);
          padding: 2em;
        }
        .festInfo .description { 
          color: rgb(74, 74, 74);
        }
        .festInfo .images {
          display: grid;
          grid-auto-rows: minmax(200px, auto);
          grid-template-columns: repeat(auto-fit, minmax(auto, 400px));
          flex-wrap: wrap;
          justify-content: center;
          grid-gap: 1em;
        }
        section#comunicacoes {
          background: var(--app-primary-color);
          color: white;
          padding: 1em;
        }
        section#projecto {
          text-align: right;
          font-size: xx-small;
          padding: 2em;
          line-height: 0.75em;
          color: black;
        }
        @media (max-width: 639px) {
          items-listing {
            padding: 5px;
          }
          .expositionsContainer {
            padding: 5px;
          }
        }
      </style>
      <items-listing category="movie" id="filmes" data=${movies}></items-listing>

      <section id="exposicoes" class="expositionsContainer">
        <h1 class="title is-1">Exposições</h1>
        <p>Exposição Itinerante de fotografia sobre o Alentejo.</p>
        <p>Uma proposta que engloba a realização de uma exposição de Fotografia sobre o Alentejo, que pretende colocar em evidência a ligação entre o Património Material e Imaterial do Alto, Baixo, Litoral e Alentejo Central. Trata-se de uma exposição única que circulará por 6 cidades adaptada às galerias municipais existentes, a espaços expositivos próprios em unidades hoteleiras e ao espaço urbano onde serão afixadas em mobiliário urbano pré-existente ou em telas colocadas no exterior.</p>
        <p>A mostra conta com uma publicação que compilará uma seleção das imagens expostas mais ilustrativas.</p>
        <p>Estas ações contam com o envolvimento dos fotógrafos Rui Diogo Castela, Carlos Gasparinho e Telmo Rocha.</p>
        <div class="columns">
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/rui_castela.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQG/8QAHxAAAgEEAgMAAAAAAAAAAAAAAQIRAAMhMRIiE5Gh/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABoRAAICAwAAAAAAAAAAAAAAAAADARQVUWH/2gAMAwEAAhEDEQA/ANXd8fJjbtqI03YSPVA911niqLo9Zk/KofBYDVEcnNDkHcEoKnZ//9k="
              alt="Rui Castela"></view-item-image>
            <p class="heading">Rui Castela</p>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/carlos_gasparinho.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFB//EACIQAAICAgEDBQAAAAAAAAAAAAECAxEABBIFE5IGISIjMf/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAcEQABBAMBAAAAAAAAAAAAAAABAAIDoRESE0H/2gAMAwEAAhEDEQA/AEtX0z05hGz7qtIGBPc5m1s8gfjV0aFZfSKCPYWJYtU6qQgKRI4YMPYCq/KGZtFNKAPsfyOGM8tEd1/I4HKQHIfQS7R+ttf/2Q=="
              alt="Carlos Gasparinho"></view-item-image>
            <p class="heading">Carlos Gasparinho</p>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/telmo_rocha.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQMEBv/EACIQAAIBAwQCAwAAAAAAAAAAAAECAwQFIQAGETESFDJBof/EABQBAQAAAAAAAAAAAAAAAAAAAAP/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8Ax9g2gK8LV19bDQW/6mK+byYPwXGMdnSNx2Cmt6pPb7j7cJPDrJH4SITznGCMfupIJ5ZVQySMxGASedGd3WMkM3PXeghn/9k="
              alt="Telmo Rocha"></view-item-image>
            <p class="heading">Telmo Rocha</p>
          </div>
        </div>
        <h1 class="title is-2">Calendário</h1>
        <div class="calendar">
          <ul>
            <li><b>Évora</b> - 18 Abril a 31 Julho 2019<span> - Armazém 8</span></li>
            <li><b>Beja</b> - Outubro a Dezembro 2018<span> - Centro Unesco</span></li>
            <li><b>Cuba</b> - 7 a 31 de Dezembro 2018<span> - Galeria de Exposições - Biblioteca Municipal</span></li>
            <li><b>Elvas</b> - 17 a 31 Janeiro 2019<span> - Galeria Municipal</span></li>
            <li><b>Vidigueira</b> - até Dezembro 2018<span> - Centro Multifacetado e Novas Tecnologias de Vidigueira</span></li>
          </ul>
        </div>
        <div class="columns cartazes">
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/evora_cartaz.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMG/8QAIxAAAgECBQUBAAAAAAAAAAAAAQIDBiEABAURMQcSQVGhIv/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAHREAAgIBBQAAAAAAAAAAAAAAAQIAAwQRMYGRsf/aAAwDAQACEQMRAD8Aw7Z6jxOrjR1eFlP4jMTN3G/Hf4+cYTHr1A5dBFLTMrOvJaNN/j4lD071d4QGpLVN9uUnYg2vbt94NN0zqRpSYqbz6JbZWcki1/HvEV2DXcdSzcMR5GW9lGw6n//Z"
              alt="Evora - Cartaz"></view-item-image>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/beja_exposicao_alentejos_cartaz.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQG/8QAJRAAAgECBQMFAAAAAAAAAAAAAQIDBhEABSExUQQHEhNBQoGh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAdEQACAgEFAAAAAAAAAAAAAAABAgADBBExgZGx/9oADAMBAAIRAxEAPwDDt19ICZXGTq8LIR4RmJmBbXby0t922xQlRUPAvpPS5Zl3LxIT+PbBw9uc4aJVeks0vbQpOSDpY/HnAS9sqkaQmKm+vRNLKzkkc+3OIrsGu46sW4YjyMt7KNh1P//Z"
              alt="Beja - Cartaz"></view-item-image>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/cuba_cartaz.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwb/xAAlEAACAQIEBgMAAAAAAAAAAAABAgMGIQAEBREHEhUxUaEjQUL/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMxcQQRkf/aAAwDAQACEQMRAD8AiDn6PE6v0dXhZD8cZiZuY3Fue23rth4teoLLxiKWmpmde5aOMn0+Dh4c6w0Sq9JapvtYxzkg22P584CXhlUjSExU3n0S2ys5JHn684iu4Ndx7LMNMRjUZb2UYHk//9k="
              alt="Cuba - Cartaz"></view-item-image>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/elvas_cartaz.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMEBv/EACIQAAEDAwQDAQAAAAAAAAAAAAECAwYABBEFEiExIkFxkf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAHBEAAgICAwAAAAAAAAAAAAAAAQIAAwQRMYGR/9oADAMBAAIRAxEAPwDCp1GM29xbv22ihQAJ2NutlQKh95xT3JPHQsh6PXJcHfLdV6RB5HaWimriHOvl/KXnAps5SAQNgI8Vc959UC4RLi4rZCbVKc8AoT1+1JZiJY2yW6YiKLmA4Hk//9k="
              alt="Elvas - Cartaz"></view-item-image>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/vidigueira_cartaz.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwQG/8QAJRAAAgEDAgUFAAAAAAAAAAAAAQIDBhEhAAQFBxIxURVBQqGy/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAcEQACAgIDAAAAAAAAAAAAAAABAgADMXEEEZH/2gAMAwEAAhEDEQA/AMQd9R4nV/R1eFkYdEZiZgzZGOvFvrtqiPjtA7eMRS03Ozr3LRR3/eih5c8YaJVekuKXtgxzkg4sfj50EvLKpGkJipvfomLKzkkefbzqK7g13Hssw0xGNRlvZRgeT//Z"
              alt="Vidigueira - Cartaz"></view-item-image>
          </div>
          <div class="column">
            <view-item-image clickable
              src="data/images/exposicoes/abrilalentejos_evora.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQAAsDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQYH/8QAIhAAAQQBBAIDAAAAAAAAAAAAAwECBBEFAAYSMSFRFUFC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAMAwEAAhEDEQA/AMvApNz5DG4/I5EUcKvVqEFC4uZbfukTl170hL2hAhyXxx7iKRjKpyBq/F9ctTkeWEGUikIOW9gl5vYo0a7peuKovrTh8nBOZxPipq32rmOu08L+l06FKN//2Q=="
              alt="Abril - Alentejos"></view-item-image>
          </div>
        </div>
        <div>
          <p>Marcamos presença nas comemorações <a href="http://w3.patrimoniocultural.pt/dims2019/public/view.php?id=237&fbclid=IwAR2belxUXxfgl31BvflfTLrPKR36Ft3-uyb4lRxaqLYMKN2Bv92hznJB7pc" target="_blank" rel="noopener">Nacionais do Dia Internacional dos Monumentos e Sítios</a> com a exposição do ArtFest "Alentejos"</p>
          <p>A exposição vai estar patente ao publico ate 31 de Junho</p>
      </div>
      </section>
      
      <items-listing category="show" id="espectaculos" data=${shows}></items-listing>

    <section id="info" class="festInfo">
        <div class="description">
          <h1><span style="font-weight: bold;">ArtFest</span> PATRIMÓNIOS</h1>
          <p>É a designação genérica do projeto de animação cultural promovido pela Associ’arte - Associação de Comunicação
            e Artes e conta com as parcerias de vários municípios: Évora, Elvas, Beja, Cuba, Vidigueira e Portel. A decorrer
            até 2019, o projeto é Cofinanciado pelo Alentejo 2020, Portugal 2020, União Europeia – Fundo Europeu de Desenvolvimento
            Regional.</p>
          <p>Trata-se de um conjunto de iniciativas que evidenciam algumas das características distintivas da Região Alentejo
            como o vasto património imaterial, características naturais e geográficas, gastronomia, vinho, música, danças,
            teatro de bonecos e o cante.</p>
          <p>Inclui uma programação cultural regional, abrangente e articulada que divulga e promove as suas singularidades
            junto dos seus habitantes e de quem nos visita.</p>
          <p>ArtFest
            <span style="font-weight: bold;">PATRIMÓNIOS</span> inclui trinta e seis espetáculos, seis filmes Documentais e duas exposições fotográficas.</p>
        </div>
        <div class="images">
          <view-item-image clickable
              src="images/festival/abertura/1.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMH/8QAJBAAAgEEAQIHAAAAAAAAAAAAAQIDAAQFIRIRMRMUIjNBUlP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAv/EABkRAAIDAQAAAAAAAAAAAAAAAAECABFRA//aAAwDAQACEQMRAD8Aze0x9/MyeLK6qsbL7nX1MCB2PcEg7pF9iZUUNsr1YEs4/IKPn7Amn4m9uS8tmZma3EplEbbHLW91O9yt8ccU8y/FJmCjWhzGqB2TpWSgLS9n/9k="
              alt="Abertura Festival"></view-item-image>
            <view-item-image clickable
              src="images/festival/abertura/2.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgMH/8QAJRAAAgIBAgQHAAAAAAAAAAAAAQMCEQQAEgUGITETFCMyQVKx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAaEQACAgMAAAAAAAAAAAAAAAABAgARAxIx/9oADAMBAAIRAxEAPwDJvHyFJvEynx2wo7ZkUTM9O/1rTjkrifEMozZncyTQ1bAF4rYAyeNp6iXxXbQbHaySMgmcvUYN9Gt1g3q3mHRxMV0XMDJIZchIi/cPzpqi5KIsQddh2p//2Q=="
              alt="Abertura Festival"></view-item-image>
            <view-item-image clickable
              src="images/festival/abertura/3.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMGB//EACEQAAICAQQCAwAAAAAAAAAAAAECAwQRAAUSYQYhEzFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIDEf/aAAwDAQACEQMRAD8AzHadoZZKfyqzEWUkk4oWAQgffY95Gi3torqqJXsMBVaMZhIJYu2Ce8Y1Y7HXgagszQxNIzWFZmQHIXjxHv8AM6R47Rq2tsuS2K8cro4CtIvIgZ71RjtUtWHxy5P/2Q=="
              alt="Abertura Festival - Ricardo Martins"></view-item-image>
          <video-container url="https://youtu.be/3us3jzHgkso" class="shadowed"></video-container>
          <video-container url="https://youtu.be/2_XpZyj3T8E" class="shadowed"></video-container>
        </div>
    </section>

    <section id="comunicacoes">
      <div class="description">
        <h1>Comunicações</h1>
      </div>
      <div class="columns">
        <div class="column">
         <view-item-image clickable
              src="data/images/comunicacao/convite_exposicao_evora.jpg"
              placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAIBAAAgMAAQQDAAAAAAAAAAAAAQMCBBEAEiExoQUigf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEAAQIHAQAAAAAAAAAAAAAAAQACAwYREhUxodH/2gAMAwEAAhEDEQA/AH067mLiUtTA7365Dv8AnJNS0siU7KZR8kDNPviyNKqWz2urAwgfUeOZKNdDPmWKmlcliuJCJiM3rkN9ckBLEUgi5vfErkW7oeL/2Q=="
              alt="Exposição Alentejos - Évora"></view-item-image>
          <view-item-image clickable
                src="data/images/comunicacao/Mupi_1.jpg"
                placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAMABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQQFBv/EACEQAAIBBAICAwAAAAAAAAAAAAEDAgAEERIFIRNRBjGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/xAAaEQACAgMAAAAAAAAAAAAAAAAAEQESITFh/9oADAMBAAIRAxEAPwClx9zattZuc6YXGWC+T5EROB9kS9mnrAoc2LF3DDIOhoYskYkCUQc5PYOazTOJVYiS1PeVB3m8ZkNdx1noeqPBLMPkvHgMnqXRgY56I2z+imXwqKqXs//Z"
                alt="Mupi"></view-item-image>
        </div>
        <div class="column">
          <view-item-image clickable
                src="data/images/comunicacao/Mupi_2.jpg"
                placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAJRAAAgECBQMFAAAAAAAAAAAAAQIDAAUEBhEhYRIUMRZBkcHR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAXEQEBAQEAAAAAAAAAAAAAAAABAgAx/9oADAMBAAIRAxEAPwCNa87Y6GHtp+mYO4Vl8llZtTpzxTv1ta7a8QW0Y6RZ0Ekk7BV6SdgPP3WFMzxSExyOo91B2PNI8vX3HmaHCtIrRkAald/n9qlbOOJiHpv/2Q=="
                alt="Mupi"></view-item-image>
        </div>
        <div class="column">
          <view-item-image clickable
                src="data/images/comunicacao/Mupi_3.jpg"
                placeholder="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAIRAAAgEEAgIDAAAAAAAAAAAAAQMCAAQFERIhIjFBcqH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAHREAAgIBBQAAAAAAAAAAAAAAAQMAAgQREiEicf/aAAwDAQACEQMRAD8Az8TiMhd2RujYumnRImFkb116pDcchO4ujNcxATkJLI0Khj8VapehMBPTHRWTzPQI+B6/KXepUtkoLhwCiQOJPl9u+6VOY5Y2g6+w2Y1L9jxP/9k="
                alt="Mupi"></view-item-image>
        </div>
        <div class="column">
          <view-item-image clickable
                src="data/images/comunicacao/Mupi_Av._S._Joao_Deus_3.jpg"
                alt="Mupi - Av. S. João Deus"></view-item-image>
        </div>
      </div>
    </section>
    <section id="projecto">
      <p>Designação do projecto |   Patrimónios - ArtFest</p>
      <p>Código do projecto |    ALT20-08-2114  FEDER-000054</p>
      <p>Objectivo principal |   Património Natural e Cultural</p>
      <p>Região de intervenção |   Alentejo</p>
      <p>Entidade beneficiária |     Associ' Arte - Associação de Comunicação e Artes</p>
      <p>Data da aprovação |    9 de Janeiro de 2017</p>
      <p>Data de início |   9 Fevereiro de 2017</p>
      <p>Data de conclusão |   9 de Fevereiro de 2019</p>
      <p>Custo total elegível |   210.000,00€</p>
      <p>Apoio financeiro da União Europeia |   178.500,00€</p>
      <p>Apoio financeiro público nacional/regional |     31.500,00€</p>
      <p>Objectivos  actividades e resultados esperados !  Aumentar o numero e qualidade de turismo cultural na região do projecto</p>
    </section>

      `;
  }
  created() {
    if (!store.getState().data.initialDataRequested) {
      store.dispatch(loadAll());
    }
  }
  constructor() {
    super();
    this._items = null;
    this.addEventListener('select-elem', (e) => this._scrollToLocationHashElem(e.detail.selector));
  }
  stateChanged(state) {
    this._items = itemListSelector(state);
    // init slideshow
    if (this._items['shows']) {
      let elem = $$(this, '.slideshow');
      let sliderItems = this._getSliderElems();
      if (elem && elem.items != sliderItems) {
        elem.items = sliderItems;
      }
    }
    this.render();
  }
  _scrollToLocationHashElem(selector) {
    if (selector) {
      let elem = $$(this, selector);
      elem && elem.scrollIntoView();
    }
  }
  _getSliderElems() {
    const currentDate = new Date();
    let data = [{
      type: "espectaculo",
      name: 'Alentejos',
      slug: 'alentejos',
      images: {
        featured: {
          url: 'data/images/comunicacao/convite_exposicao_evora.jpg',
          placeholder: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAIBAAAgMAAQQDAAAAAAAAAAAAAQMCBBEAEiExoQUigf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/8QAHhEAAQIHAQAAAAAAAAAAAAAAAQACAwYREhUxodH/2gAMAwEAAhEDEQA/AH067mLiUtTA7365Dv8AnJNS0siU7KZR8kDNPviyNKqWz2urAwgfUeOZKNdDPmWKmlcliuJCJiM3rkN9ckBLEUgi5vfErkW7oeL/2Q=='
        }
      },
      schedule: {
        evora: {
          date: "2019-01-18T18:00:00",
          location: "Galeria de exposições da Casa de Burgos",
          place: "Evora"
        }
      }
    }];
    data = data.concat(this._items['movies'].concat(this._items['shows']))
      .filter((i) => i.slug && !i['to_be_released'])
      .reduce((ids, i) => {
        let nextShows = i.schedule && Object.keys(i.schedule).map( (key) => i.schedule[key]).filter((e) => new Date(e.date) > currentDate);
        if (nextShows && nextShows.length > 0) {
          ids.push({...i, nextShows});
        }
        return ids;
      }, []).sort((a, b) => {
        let dateA = new Date(a.nextShows[0].date);
        let dateB = new Date(b.nextShows[0].date);
        return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
      });
      return data;
  }
}
ViewHome.define('view-home');