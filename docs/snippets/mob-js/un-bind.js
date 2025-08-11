import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
