import { BaseElement } from './../helpers/base-element';
import './view-item-image';
import './app-dialog';
import hyper from 'hyperhtml';


class VideoContainer extends BaseElement {
  render() {
    const videoThumbnailUrl = this._getVideoThumbnailImage();
    const videoUrl = this._getVideoUrl();
    const videoIframe = this.videoWire = this.videoLoaded ? ( this.videoWire || hyper.wire()`<iframe id="video_player" type="text/html" src="${videoUrl}" frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`) : '';
    const viewItemImage = hyper.wire(this)`<view-item-image
      id="thumbImage"
      src="${videoThumbnailUrl ? videoThumbnailUrl : ''}"
      alt="${this.alt ? this.alt : 'Video'}"></view-item-image>`;
    return this.html`
    
    <style>
      :host {
        display: block;
        --artfest-video-icon-width: 50px;
        --artfest-video-icon-height: 35px;
        position: relative;
        cursor: pointer;
      }
      #thumbImage {
        width: 100%;
        --iron-image-width: 100%;
      }
      .videoPlayIconContainer {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .playButton {
        height: var(--artfest-video-icon-height);
        width: var(--artfest-video-icon-width);
        color: white;
        background-color: rgba(255,1,1,.9);
        border-radius: 20%;
      }
      .playButton .arrow-right {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 20px solid white;
        margin-left: 16px;
        margin-top: 8px;
      }
      .videoWrapper iframe {
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
    </style>

    
    ${viewItemImage}
    <div class="videoPlayIconContainer"
      onclick="${this._loadVideoContainer}"
      aria-label="play">
        <div class="playButton">
          <div class="arrow-right"></div>
        </div>
    </div>
    
    <app-dialog with-backdrop="true">
      <div class="videoWrapper">${videoIframe}</div>
    </app-dialog>
    `
  }
  constructor() {
    super();
    this.providers = [{
      name: 'youtube',
      url: 'https://www.youtube.com/embed/{{videoId}}?enablejsapi=1&rel=0',
      thumbnailUrl: 'https://img.youtube.com/vi/{{videoId}}/0.jpg',
      videoIdRegex: /https?:\/\/youtu\.be\/(.+)/,
      videoIframeApi: {
        data:{
          'event': 'command',
          'func': 'pauseVideo',
          'args': []
        }
      }
    }, {
      name: 'vimeo',
      url: 'https://player.vimeo.com/video/{{videoId}}?api=1',
      thumbServiceUrl: 'https://vimeo.com/api/oembed.json?url={{videoUrl}}',
      videoIdRegex: /https?:\/\/(?:(?:player\.vimeo\.com\/video)|(?:vimeo\.com))\/(\d+)/,
      videoIframeApi: {
        data: { method: 'pause'}
      }
    }];
    this._pauseVideoPlayer = this._pauseVideoPlayer.bind(this);
    this._loadVideoContainer = this._loadVideoContainer.bind(this);
  }
  created() {
    this.render();
    this._thumb = this.shadowRoot.querySelector('#thumbImage');
    this._dialog = this.shadowRoot.querySelector('app-dialog');
    this._dialog.addEventListener('collapse', this._pauseVideoPlayer);
  }
  disconnectedCallback() {
    this._dialog && this._dialog.removeEventListener('collapse', this._pauseVideoPlayer);
  }
  static get observedAttributes() {
    return ['url', 'thumb', 'alt'];
  }
  attributeChangedCallback(prop, old, curr) {
    if (prop == 'url') {
      this._updateProviderFromVideoUrl(curr);
    }
    this.render();
  }
  _getVideoUrl() {
    if (!this.videoId || !this.provider) {
      return;
    }
    let url = this.provider.url.replace('{{videoId}}', this.videoId);
    return url;
  }
  _getVideoThumbnailImage() {
    if (!this.videoId || !this.provider) {
      return;
    }
    if (!this.provider.thumbnailUrl && this.provider.thumbServiceUrl) {
      let providerUrl = this._getVideoUrl();
      let videoDescUrl = this.provider.thumbServiceUrl.replace('{{videoUrl}}', providerUrl);
      fetch(videoDescUrl).then(resp => resp.json()).then(data => {
        this._thumb.src = data.thumbnailUrl || data.thumbnail_url;
      });
      return '';
    }
    return this.provider.thumbnailUrl.replace('{{videoId}}', this.videoId);
  }
  _loadVideoContainer() {
    if (!this._dialog) {
      this._dialog = this.shadowRoot.querySelector('app-dialog');
    }
    if (!this.videoLoaded) {
      this.videoLoaded = true;
      this.render();
    }
    this._dialog.expand(this._thumb);
  }
  _pauseVideoPlayer() {
    let iframe = this._dialog.querySelector('iframe');
    let contentWindow = iframe.contentWindow;
    let cmd = this.provider.videoIframeApi.data;
    contentWindow.postMessage(JSON.stringify(cmd), this.provider.url);
  }
  _updateVideoMeta(exp, url) {
    let results = url.match(exp);
    return results ? results[1] : '';
  }
  _updateProviderFromVideoUrl(url) {
    for (let i=0; i < this.providers.length; i++) {
      let elem = this.providers[i];
      let id = this._updateVideoMeta(elem.videoIdRegex, url);
      if (id) {
        this.provider =  elem;
        this.videoId = id;
        break;
      }
    }
  }
}
VideoContainer.define('video-container');