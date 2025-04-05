/**
export type Emit<T> = (prop: keyof T) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
