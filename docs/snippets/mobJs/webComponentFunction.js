import { html } from '../../../src/js/mobjs';

/**
 * Default component
 */
export const MyComponent = () => {
    return html` <div>my component.</div> `;
};

/**
 * webComponent
 */
export const MyComponent = () => {
    return html` <my-component>my component.</my-component> `;
};
