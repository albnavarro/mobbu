/**
 * Export type Emit<T> = (prop: keyof T) => void;
 */

import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, emit, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        emit(() => proxi.myState);
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
