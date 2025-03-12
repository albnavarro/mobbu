//@ts-check

import { html } from '../../../mobjs';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').AnyComponent>} */
export const AnyComponentFn = ({ getState }) => {
    const { content } = getState();

    return html`${content}`;
};
