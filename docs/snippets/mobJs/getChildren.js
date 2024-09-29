/**
getChildren(componentName: string): Array<string>;
**/

import { setStateById } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, getChildren }) => {
    onMount(() => {
        const childrensId = getChildren('child-component');

        childrensId.forEach((childID) => {
            setStateById(childID, 'state', 'value');
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
