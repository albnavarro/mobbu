import { html, MobJs } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getChildren }) => {
    onMount(() => {
        const childrensId = getChildren('child-component');

        childrensId.forEach((childID) => {
            MobJs.setStateById(childID, 'state', 'value');
        });
    });
    /**
     * DOM component structure.
     */
    return html`
        <div>
            <child-component></child-component>
            <child-component></child-component>
            <child-component></child-component>
            <child-component></child-component>
            <child-component></child-component>
            <child-component></child-component>
        </div>
    `;
};
