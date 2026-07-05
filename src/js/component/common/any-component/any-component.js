import { htmlString } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AnyComponent>} */
export const AnyComponentFunction = ({ getState }) => {
    const { content } = getState();

    return htmlString(content);
};
