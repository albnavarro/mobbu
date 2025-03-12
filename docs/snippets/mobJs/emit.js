/**
export type Emit<T> = (prop: keyof T) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, emit }) => {
    onMount(() => {
        emit('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
