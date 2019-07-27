import hyper from 'hyperhtml';

export const SharedStyles = () => {
  return hyper.wire()`
    <style>
      :host {
        display: block;
        box-sizing: border-box;
      }
      .shadowed {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
    </style>
  `;
}