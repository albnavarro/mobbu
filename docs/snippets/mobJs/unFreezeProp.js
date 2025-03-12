/**
export type UnFreezeProp<T> = (prop: keyof T) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, unFreezeProp }) => {
    onMount(() => {
        unFreezeProp('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
