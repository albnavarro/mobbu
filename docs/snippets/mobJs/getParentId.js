/**
export type GetParentId = () => string | undefined;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, getParentId }) => {
    onMount(() => {
        const parentID = getParentId();

        //
        console.log(parentID);
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
