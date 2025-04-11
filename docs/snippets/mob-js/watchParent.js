/**
watchParent(prop: string, callback: () => void): void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, watchParent }) => {
    onMount(() => {
        watchParent('parentState', (value, _oldValue) => {
            console.log(value);
        });
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
