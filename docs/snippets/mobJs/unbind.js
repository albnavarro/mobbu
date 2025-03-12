/**
unBind: (arg0: { id: string }) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").mobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, unBind }) => {
    onMount(() => {
        setTimeout(() => {
            unBind();
        }, 1000);
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
