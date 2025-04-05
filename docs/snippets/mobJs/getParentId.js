/**
export type GetParentId = () => string | undefined;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
