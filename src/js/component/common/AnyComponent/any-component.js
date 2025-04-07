//@ts-check

import { html } from '@mobJs';

/**
 * @import { MobComponent } from '@mobJsType';
 **/

/** @type {MobComponent<import('./type').AnyComponent>} */
export const AnyComponentFn = ({ getState }) => {
    const { content } = getState();

    return html`${content}`;
};
