//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').AnyComponent>} */
export const AnyComponentFn = ({ html, getState }) => {
    const { content } = getState();

    return html`${content}`;
};
