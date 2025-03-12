/**
remove(): void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, remove }) => {
    onMount(() => {
        setTimeout(() => {
            remove();
        }, 1000);
    });

    return html` <div>my component</div> `;
};
