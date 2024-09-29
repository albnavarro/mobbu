/**
export type GetParentId = () => string | undefined;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, getParentId }) => {
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
