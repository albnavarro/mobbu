/**
 * Export type FreezeProp<T> = (prop: keyof T) => void;
 */

import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, freezeProp, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        // Use Proxi
        freezeProp(() => proxi.myState);

        // Use String
        freezeProp('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
