/**
remove(): void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, remove }) => {
    onMount(() => {
        setTimeout(() => {
            remove();
        }, 1000);
    });

    return html` <div>my component</div> `;
};
