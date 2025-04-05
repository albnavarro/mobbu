//@ts-check

import { html } from '../../../mob/mobjs';

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';
 **/

/** @type {MobComponent<import('./type').AnyComponent>} */
export const AnyComponentFn = ({ getState }) => {
    const { content } = getState();

    return html`${content}`;
};
